package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.dto.*;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.AssetList;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.AssetListMapper;
import com.fixedasset.service.AssetListService;
import com.fixedasset.service.InvRecordService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class AssetListServiceImpl extends ServiceImpl<AssetListMapper, AssetList> implements AssetListService {

    @Resource AssetList assetList;

    @Resource AssetListMapper assetListMapper;

    @Resource ActionRecordMapper actionRecordMapper;

    @Resource private ActionRecord actionRecord;

    @Resource private InvRecordService invRecordService;

    public Page<AssetListViewDTO> newPage(Page page, LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.page(page, queryWrapper);
    }

    public List<AssetListViewDTO> newPageInWriteOff(LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.pageInWriteOff(queryWrapper);
    }

    public List<AssetListViewDTO> newReport(LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.newReport(queryWrapper);
    }

    public int sumTotal(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isBlank(assetList.getAssetCode())){
            queryWrapper.like(AssetList::getAssetCode, assetList.getAssetCode());
        }

        if (!StringUtils.isBlank(assetList.getAssetName())){
            queryWrapper.like(AssetList::getAssetName, assetList.getAssetName());
        }

        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getPlaceId() == 0)) {
            queryWrapper.eq(AssetList::getPlaceId, assetList.getPlaceId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        queryWrapper.eq(AssetList::getSponsor, 0);
        queryWrapper.isNull(AssetList::getSponsorName);
        queryWrapper.eq(AssetList::getStatu, 1);

        return assetListMapper.sumCost(queryWrapper);
    }

    public int sumCostWithSponsor(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isBlank(assetList.getAssetCode())){
            queryWrapper.like(AssetList::getAssetCode, assetList.getAssetCode());
        }

        if (!StringUtils.isBlank(assetList.getAssetName())){
            queryWrapper.like(AssetList::getAssetName, assetList.getAssetName());
        }

        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getPlaceId() == 0)) {
            queryWrapper.eq(AssetList::getPlaceId, assetList.getPlaceId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }

        queryWrapper.eq(AssetList::getStatu, 1);
        queryWrapper.eq(AssetList::getSponsor, 1);
        queryWrapper.isNotNull(AssetList::getSponsorName);

        return assetListMapper.sumCostWithSponsor(queryWrapper);
    }

    public String createNew(AssetList assetList) {
        String newCode = this.getNewAssetCode();
        assetList.setAssetCode(newCode);
        assetList.setStatu(1);
        assetList.setCreated(LocalDateTime.now());
        assetListMapper.insert(assetList);

        invRecordService.saveNewRecord(newCode, assetList.getPlaceId());

        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Asset List Manger");
        actionRecord.setActionData(assetList.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
        return newCode;
    }

    public void update(AssetList assetList) {
        long oldId = assetList.getId();
        int assetId = (int)oldId;
        invRecordService.saveRecord(assetId, assetList.getPlaceId());

        assetList.setUpdated(LocalDateTime.now());
        assetListMapper.updateById(assetList);

        actionRecord.setActionName("Update");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Asset List Manger");
        actionRecord.setActionData(assetList.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public void remove(Long id) {
        AssetList assetListOld = assetListMapper.selectById(id);
        invRecordService.writeOff(assetListOld.getAssetCode(), assetListOld.getPlaceId());

        assetList.setId(id);
        assetList.setStatu(0);
        assetListMapper.updateById(assetList);

        actionRecord.setActionName("Remove");
        actionRecord.setActionMethod("Delete");
        actionRecord.setActionFrom("Asset List Manger");
        actionRecord.setActionData(assetList.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public AssetList findOne(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetList::getAssetCode, assetList.getAssetCode());
        queryWrapper.eq(AssetList::getPlaceId, assetList.getPlaceId());

        return assetListMapper.selectOne(queryWrapper);
    }

    public AssetList findOneByAssetCode(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetList::getAssetCode, assetList.getAssetCode());
        return assetListMapper.selectOne(queryWrapper);
    }

    public List<CostWithDeptDto> getCostWithDept() { return assetListMapper.getCostWithDept(); }


    public List<AssetYearCostDept> assetYearCostDeptFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.isNotNull(AssetList::getBuyDate);
        queryWrapper.notIn(AssetList::getDeptId, 0);
        queryWrapper.notIn(AssetList::getTypeId, 0);

        if (assetList.getBuyDateFrom() != null && assetList.getBuyDateTo() != null) {
            queryWrapper.between(AssetList::getBuyDate, assetList.getBuyDateFrom(), assetList.getBuyDateTo());
        }
        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        return assetListMapper.assetYearCostDeptFind(queryWrapper);
    }

    public List<AssetItemYearMonthDto> getItemYearMonthFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.isNotNull(AssetList::getBuyDate);
        queryWrapper.notIn(AssetList::getDeptId, 0);
        queryWrapper.notIn(AssetList::getTypeId, 0);

        if (assetList.getBuyDateFrom() != null && assetList.getBuyDateTo() != null) {
            queryWrapper.between(AssetList::getBuyDate, assetList.getBuyDateFrom(), assetList.getBuyDateTo());
        }
        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        return  assetListMapper.getItemYearMonthFind(queryWrapper);
    }

    public List<AssetYearCostType> assetYearCostTypeFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.isNotNull(AssetList::getBuyDate);
        queryWrapper.notIn(AssetList::getDeptId, 0);
        queryWrapper.notIn(AssetList::getTypeId, 0);;

        if (assetList.getBuyDateFrom() != null && assetList.getBuyDateTo() != null) {
            queryWrapper.between(AssetList::getBuyDate, assetList.getBuyDateFrom(), assetList.getBuyDateTo());
        }
        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        return  assetListMapper.assetYearCostTypeFind(queryWrapper);
    }

    public List<GroupByAssetOfTypeDto> groupByTypeFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.isNotNull(AssetList::getBuyDate);
        queryWrapper.notIn(AssetList::getDeptId, 0);
        queryWrapper.notIn(AssetList::getTypeId, 0);

        if (assetList.getBuyDateFrom() != null && assetList.getBuyDateTo() != null) {
            queryWrapper.between(AssetList::getBuyDate, assetList.getBuyDateFrom(), assetList.getBuyDateTo());
        }
        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        return  assetListMapper.groupByTypeFind(queryWrapper);
    }

    public List<AssetGroupPlaceDto> getAssetGroupPlaceFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.isNotNull(AssetList::getBuyDate);
        queryWrapper.notIn(AssetList::getDeptId, 0);
        queryWrapper.notIn(AssetList::getTypeId, 0);

        if (assetList.getBuyDateFrom() != null && assetList.getBuyDateTo() != null) {
            queryWrapper.between(AssetList::getBuyDate, assetList.getBuyDateFrom(), assetList.getBuyDateTo());
        }
        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        return  assetListMapper.getAssetGroupPlaceFind(queryWrapper);
    }

    public List<AssetYearQtyType> getAssetYearQtyTypeFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.isNotNull(AssetList::getBuyDate);
        queryWrapper.notIn(AssetList::getDeptId, 0);
        queryWrapper.notIn(AssetList::getTypeId, 0);

        if (assetList.getBuyDateFrom() != null && assetList.getBuyDateTo() != null) {
            queryWrapper.between(AssetList::getBuyDate, assetList.getBuyDateFrom(), assetList.getBuyDateTo());
        }
        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        return  assetListMapper.getAssetYearQtyTypeFind(queryWrapper);
    }

    public List<AssetYearQtyDept> getAssetYearQtyDeptFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.isNotNull(AssetList::getBuyDate);
        queryWrapper.notIn(AssetList::getDeptId, 0);
        queryWrapper.notIn(AssetList::getTypeId, 0);

        if (assetList.getBuyDateFrom() != null && assetList.getBuyDateTo() != null) {
            queryWrapper.between(AssetList::getBuyDate, assetList.getBuyDateFrom(), assetList.getBuyDateTo());
        }
        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        return  assetListMapper.getAssetYearQtyDeptFind(queryWrapper);
    }

    public List<AssetCostYearMonthDto> getAssetCostYearMonthFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.isNotNull(AssetList::getBuyDate);
        queryWrapper.notIn(AssetList::getDeptId, 0);
        queryWrapper.notIn(AssetList::getTypeId, 0);

        if (assetList.getBuyDateFrom() != null && assetList.getBuyDateTo() != null) {
            queryWrapper.between(AssetList::getBuyDate, assetList.getBuyDateFrom(), assetList.getBuyDateTo());
        }
        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }
        return  assetListMapper.getAssetCostYearMonthFind(queryWrapper);
    }

    public String getNewAssetCode() {
        LambdaQueryWrapper<AssetList> lambdaQueryWrapper = Wrappers.lambdaQuery();
        lambdaQueryWrapper.select(AssetList::getAssetCode);

        List<Object> assetCodes = assetListMapper.selectObjs(lambdaQueryWrapper);
        AtomicReference<Integer> maxAssetCodes = new AtomicReference<>(0);

        assetCodes.forEach(o -> {
            String code = String.valueOf(o);
            if (code.length() >= 6) {
                Integer one = Integer.parseInt(code.substring(code.length() - 5));
                if (one > maxAssetCodes.get()) {
                    maxAssetCodes.set(one);
                }
            }

        });
        return padRight(maxAssetCodes.get() + 1, 6, "0");
    }

    public static String padRight(int oriStr, int len, String alexi) {
        StringBuilder str = new StringBuilder();
        int strlen = String.valueOf(oriStr).length();
        if (strlen < len) {
            for (int i = 0; i < len - strlen; i++) {
                str.append(alexi);
            }
        }
        str.append(oriStr);
        return str.toString();
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }

}
