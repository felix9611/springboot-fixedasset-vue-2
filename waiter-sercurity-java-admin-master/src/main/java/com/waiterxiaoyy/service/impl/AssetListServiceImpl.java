package com.waiterxiaoyy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.waiterxiaoyy.dto.AssetCostYearMonthDto;
import com.waiterxiaoyy.dto.AssetListViewDTO;
import com.waiterxiaoyy.dto.GroupByAssetOfTypeDto;
import com.waiterxiaoyy.entity.ActionRecord;
import com.waiterxiaoyy.entity.AssetList;
import com.waiterxiaoyy.mapper.ActionRecordMapper;
import com.waiterxiaoyy.mapper.AssetListMapper;
import com.waiterxiaoyy.service.AssetListService;
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

    public Page<AssetListViewDTO> newPage(Page page, LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.page(page, queryWrapper);
    }

    public int sumTotal() {
        return assetListMapper.sumCost();
    }

    public String createNew(AssetList assetList) {
        String newCode = this.getNewAssetCode();
        assetList.setAssetCode(newCode);
        assetList.setStatu(1);
        assetList.setCreated(LocalDateTime.now());
        assetListMapper.insert(assetList);

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

    public List<AssetCostYearMonthDto> getCostYearMonth() {
        return assetListMapper.getCostYearMonth();
    }

    public List<GroupByAssetOfTypeDto> groupByType() { return assetListMapper.groupByType(); }

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
