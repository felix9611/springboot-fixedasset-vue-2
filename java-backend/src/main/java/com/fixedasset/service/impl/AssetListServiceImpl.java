package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.dto.*;
import com.fixedasset.entity.AssetList;
import com.fixedasset.entity.AssetListFile;
import com.fixedasset.entity.AssetType;
import com.fixedasset.entity.Department;
import com.fixedasset.entity.Location;
import com.fixedasset.entity.Vendor;
import com.fixedasset.mapper.AssetListMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.AssetListFileService;
import com.fixedasset.service.AssetListService;
import com.fixedasset.service.AssetTypeService;
import com.fixedasset.service.DepartmentService;
import com.fixedasset.service.InvRecordService;
import com.fixedasset.service.LocationService;
import com.fixedasset.service.VendorService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class AssetListServiceImpl extends ServiceImpl<AssetListMapper, AssetList> implements AssetListService {

    @Resource AssetList assetList;

    @Resource AssetListMapper assetListMapper;

    @Resource private InvRecordService invRecordService;

    @Resource private AssetListFileService assetListFileService;

    @Resource private AssetListFile assetListFile;

    @Resource private AssetTypeService assetTypeService;

    @Resource private DepartmentService departmentService;

    @Resource private LocationService locationService;

    @Resource private VendorService vendorService;

    @Resource private ActionRecordService actionRecordService;

    public Page<AssetListViewDTO> newPage(Page page, LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.pageAndList(page, queryWrapper);
    }

    public List<AssetListViewDTO> newPageInWriteOff(LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.pageInWriteOff(queryWrapper);
    }

    public List<AssetListViewDTO> newReport(LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.newReport(queryWrapper);
    }

    public AssetCostYearMonthDto sumTotal(AssetList assetList) {
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

        if (!assetList.getTypeIds().isEmpty()) {
            queryWrapper.in(AssetList::getTypeId, assetList.getTypeIds());
        }
        if (!assetList.getPlaceIds().isEmpty()) {
            queryWrapper.in(AssetList::getPlaceId, assetList.getPlaceIds());
        }
        if (!assetList.getDeptIds().isEmpty()) {
            queryWrapper.in(AssetList::getDeptId, assetList.getDeptIds());
        }

        queryWrapper.eq(AssetList::getSponsor, 0);
        queryWrapper.isNull(AssetList::getSponsorName);
        queryWrapper.eq(AssetList::getStatu, 1);

        return assetListMapper.sumCost(queryWrapper);
    }

    public AssetCostYearMonthDto sumCostWithSponsor(AssetList assetList) {
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

        if (!assetList.getTypeIds().isEmpty()) {
            queryWrapper.in(AssetList::getTypeId, assetList.getTypeIds());
        }
        if (!assetList.getPlaceIds().isEmpty()) {
            queryWrapper.in(AssetList::getPlaceId, assetList.getPlaceIds());
        }
        if (!assetList.getDeptIds().isEmpty()) {
            queryWrapper.in(AssetList::getDeptId, assetList.getDeptIds());
        }

        queryWrapper.eq(AssetList::getStatu, 1);
        queryWrapper.eq(AssetList::getSponsor, 1);
        queryWrapper.isNotNull(AssetList::getSponsorName);

        return assetListMapper.sumCost(queryWrapper);
    }

    public String createNew(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper2 = Wrappers.lambdaQuery();
        queryWrapper2.eq(AssetList::getAssetName, assetList.getAssetName());
        queryWrapper2.eq(AssetList::getStatu, 1);
        AssetList checkAsset = assetListMapper.selectOne(queryWrapper2);

        if (checkAsset == null) {
            String newCode = this.getNewAssetCode();
            assetList.setAssetCode(newCode);
            assetList.setStatu(1);
            assetList.setCreated(LocalDateTime.now());

            assetListMapper.insert(assetList);

            // Save file
            List<AssetListFile> newAssetListFiles = assetList.getNewAssetListFiles();
            if (newAssetListFiles.size() > 0) {
                for (AssetListFile assetListFile : newAssetListFiles) {
                    assetListFile.setAssetId(Math.toIntExact(assetList.getId()));
                    assetListFileService.saveListPicture(assetListFile);
                }
            } 

            invRecordService.saveNewRecord(newCode, assetList.getPlaceId());

            actionRecordService.createdAction(
                    "Save", 
                    "POST", 
                    "Asset List", 
                    assetList.getAssetCode() + " - " + assetList.getAssetName(), 
                    "Success"
            );

            return newCode;
        } else {
            actionRecordService.createdAction(
                    "Save", 
                    "POST", 
                    "Asset List", 
                    assetList.getAssetCode() + " - " + assetList.getAssetName(), 
                    "Failure"
            );
            throw new RuntimeException("Exist in records!");
        }
        
    }

    public void importData(List<AssetListUploadDataDto> assetListUploadDatas) {
        for (AssetListUploadDataDto assetListUploadDataDto : assetListUploadDatas) {


           /*  LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

            queryWrapper.eq(AssetList::getAssetName, assetListUploadDataDto.getAssetName());
            queryWrapper.eq(AssetList::getStatu, 1);

            AssetList assetListCheck = assetListMapper.selectOne(queryWrapper);

            if (assetListCheck.getId() == null) { */
                LambdaQueryWrapper<AssetList> queryWrapper2 = Wrappers.lambdaQuery();
                queryWrapper2.eq(AssetList::getAssetCode, assetListUploadDataDto.getAssetCode());
                queryWrapper2.eq(AssetList::getStatu, 1);
                AssetList checkAssetCode = assetListMapper.selectOne(queryWrapper2);

                if (checkAssetCode != null) {
                    String newCode = this.getNewAssetCode();
                    assetList.setAssetCode(newCode);
                } else {
                    assetList.setAssetCode(assetListUploadDataDto.getAssetCode());
                }

                if (StringUtils.isNotBlank(assetListUploadDataDto.getTypeCode()) || StringUtils.isNotBlank(assetListUploadDataDto.getTypeName())) {
                    LambdaQueryWrapper<AssetType> queryWrapperType = Wrappers.lambdaQuery();
                    if(StringUtils.isNotBlank(assetListUploadDataDto.getTypeCode())) {
                        queryWrapperType.eq(AssetType::getTypeCode, assetListUploadDataDto.getTypeCode());
                    }
                    if(StringUtils.isNotBlank(assetListUploadDataDto.getTypeName())) {
                        queryWrapperType.eq(AssetType::getTypeName, assetListUploadDataDto.getTypeName());
                    }
                    queryWrapperType.eq(AssetType::getStatu, 1);
                    AssetType assetType = assetTypeService.getOne(queryWrapperType);

                    if (assetType == null) {
                        throw new RuntimeException("The type not exist in records!");
                    } else {
                        assetList.setTypeId(Math.toIntExact(assetType.getId()));
                    }
                }

                if (StringUtils.isNotBlank(assetListUploadDataDto.getDeptCode()) || StringUtils.isNotBlank(assetListUploadDataDto.getDeptName())) {
                    LambdaQueryWrapper<Department> queryWrapperDept = Wrappers.lambdaQuery();
                    if(StringUtils.isNotBlank(assetListUploadDataDto.getDeptCode())) {
                        queryWrapperDept.eq(Department::getDeptCode, assetListUploadDataDto.getDeptCode());
                    }
                    if(StringUtils.isNotBlank(assetListUploadDataDto.getDeptName())) {
                        queryWrapperDept.eq(Department::getDeptName, assetListUploadDataDto.getDeptName());
                    }
                    queryWrapperDept.eq(Department::getStatu, 1);
                    Department department = departmentService.getOne(queryWrapperDept);

                    if (department == null) {
                        throw new RuntimeException("The type not exist in records!");
                    } else {
                        assetList.setDeptId(Math.toIntExact(department.getId()));
                    }
                }

                if (StringUtils.isNotBlank(assetListUploadDataDto.getPlaceCode()) || StringUtils.isNotBlank(assetListUploadDataDto.getPlaceName())) {
                    LambdaQueryWrapper<Location> queryWrapperPlace = Wrappers.lambdaQuery();
                    if(StringUtils.isNotBlank(assetListUploadDataDto.getPlaceCode())) {
                        queryWrapperPlace.eq(Location::getPlaceCode, assetListUploadDataDto.getPlaceCode());
                    }
                    if(StringUtils.isNotBlank(assetListUploadDataDto.getPlaceName())) {
                        queryWrapperPlace.eq(Location::getPlaceName, assetListUploadDataDto.getPlaceName());
                    }
                    queryWrapperPlace.eq(Location::getStatu, 1);
                    Location location = locationService.getOne(queryWrapperPlace);

                    if (location == null) {
                        throw new RuntimeException("The type not exist in records!");
                    } else {
                        assetList.setPlaceId(Math.toIntExact(location.getId()));
                    }
                }

                if (StringUtils.isNotBlank(assetListUploadDataDto.getVendorCode()) || StringUtils.isNotBlank(assetListUploadDataDto.getVendorName())) {
                    LambdaQueryWrapper<Vendor> queryWrapperVendor = Wrappers.lambdaQuery();
                    if (StringUtils.isNotBlank(assetListUploadDataDto.getVendorCode())) {
                        queryWrapperVendor.eq(Vendor::getVendorCode, assetListUploadDataDto.getVendorCode());
                    }
                    if (StringUtils.isNotBlank(assetListUploadDataDto.getVendorName())) {
                        queryWrapperVendor.eq(Vendor::getVendorName, assetListUploadDataDto.getVendorName());
                    }
                    if (StringUtils.isNotBlank(assetListUploadDataDto.getVendorType())) {
                        queryWrapperVendor.eq(Vendor::getType, assetListUploadDataDto.getVendorType());
                    }
                    queryWrapperVendor.eq(Vendor::getStatu, 1);
                    Vendor checkOne = vendorService.getOne(queryWrapperVendor);

                    Vendor vendor = new Vendor();
                    vendor.setVendorCode(assetListUploadDataDto.getVendorCode());
                    vendor.setVendorName(assetListUploadDataDto.getVendorName());
                    vendor.setVendorOtherName(assetListUploadDataDto.getVendorOtherName());
                    vendor.setType(assetListUploadDataDto.getVendorType());
                    vendor.setEmail(assetListUploadDataDto.getVendorEmail());
                    vendor.setPhone(assetListUploadDataDto.getVendorPhone());
                    vendor.setFax(assetListUploadDataDto.getVendorFax());
                    vendor.setAddress(assetListUploadDataDto.getVendorAddress());
                    vendor.setContactPerson(assetListUploadDataDto.getVendorContactPerson());
                    vendor.setRemark(assetListUploadDataDto.getVendorRemark());

                    if (checkOne == null) {
                        vendorService.createOne(vendor);
                        assetList.setVendorId(Math.toIntExact(vendor.getId()));
                    } else {
                        assetList.setVendorId(Math.toIntExact(checkOne.getId()));
                        vendor.setId(checkOne.getId());
                        vendorService.updateOne(vendor);
                    }
                }

                assetList.setAssetName(assetListUploadDataDto.getAssetName());
                assetList.setUnit(assetListUploadDataDto.getUnit());
              //  assetList.setBuyDate(assetListUploadDataDto.getBuyDate());
                assetList.setDescription(assetListUploadDataDto.getDescription());
                assetList.setSponsor(assetListUploadDataDto.getSponsor() == "Yes" ? 1 : 0);
                assetList.setSponsorName(assetListUploadDataDto.getSponsorName());
                assetList.setCost(assetListUploadDataDto.getCost());
                assetList.setSerialNum(assetListUploadDataDto.getSerialNum());
                assetList.setInvoiceNo(assetListUploadDataDto.getInvoiceNo());
              //  assetList.setInvoiceDate(assetListUploadDataDto.getInvoiceDate());
                assetList.setInvoiceRemark(assetListUploadDataDto.getInvoiceRemark());
                assetList.setTaxCountryCode(assetListUploadDataDto.getTaxCountryCode());
                assetList.setTaxCode(assetListUploadDataDto.getTaxCode());
                assetList.setTaxRate(assetListUploadDataDto.getTaxRate());
                assetList.setIncludeTax(assetListUploadDataDto.getIncludeTax() == "Yes" ? true : false);
                assetList.setAfterBeforeTax(assetListUploadDataDto.getAfterBeforeTax());
                assetList.setAccountCode(assetListUploadDataDto.getAccountCode());
                assetList.setAccountName(assetListUploadDataDto.getAccountName());
                assetList.setBrandCode(assetListUploadDataDto.getBrandCode());
                assetList.setBrandName(assetListUploadDataDto.getBrandName());
                assetList.setChequeNo(assetListUploadDataDto.getChequeNo());
                assetList.setMaintenancePeriodStart(assetListUploadDataDto.getMaintenancePeriodStart());
                assetList.setMaintenancePeriodEnd(assetListUploadDataDto.getMaintenancePeriodEnd());
             //   assetList.setVoucherUsedDate(assetListUploadDataDto.getVoucherUsedDate());
                assetList.setVoucherNo(assetListUploadDataDto.getVoucherNo());
                
                assetList.setRemark(assetListUploadDataDto.getRemark());
                assetList.setStatu(1);
                assetList.setCreated(LocalDateTime.now());

                assetListMapper.insert(assetList);

                invRecordService.saveNewRecord(assetList.getAssetCode(), assetList.getPlaceId());
         /*    } else {
                throw new RuntimeException("Exist in records!");
            }*/
        }
    }

    public void update(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper2 = Wrappers.lambdaQuery();
        queryWrapper2.eq(AssetList::getAssetCode, assetList.getAssetCode());
        queryWrapper2.eq(AssetList::getStatu, 1);
        AssetList checkAsset = assetListMapper.selectOne(queryWrapper2);

        if (checkAsset.getId().equals(assetList.getId())) {
            long oldId = assetList.getId();
            int assetId = (int)oldId;
            invRecordService.saveRecord(assetId, assetList.getPlaceId());

            assetList.setUpdated(LocalDateTime.now());

            List<AssetListFile> newAssetListFiles = assetList.getNewAssetListFiles();

            if (newAssetListFiles.size() > 0) {
                for (AssetListFile assetListFile : newAssetListFiles) {
                    assetListFile.setAssetId(Math.toIntExact(assetList.getId()));
                    assetListFileService.saveListPicture(assetListFile);
                }
            } 

            assetListMapper.updateById(assetList);

            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Asset List", 
                assetList.getAssetCode() + " - " + assetList.getAssetName(), 
                "Success"
            );

        } else {
            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Asset List", 
                assetList.getAssetCode() + " - " + assetList.getAssetName(), 
                "Failure"
            );
            throw new RuntimeException("No matched data in records!");
        }
    }

    public void remove(Long id) {
        LambdaQueryWrapper<AssetList> queryWrapper2 = Wrappers.lambdaQuery();
        queryWrapper2.eq(AssetList::getId, id);
        queryWrapper2.eq(AssetList::getStatu, 1);
        AssetList checkAsset = assetListMapper.selectOne(queryWrapper2);
        if (checkAsset.getId().equals(assetList.getId())) {
            AssetList assetListOld = assetListMapper.selectById(id);
            invRecordService.writeOff(assetListOld.getAssetCode(), assetListOld.getPlaceId());

            assetList.setId(id);
            assetList.setStatu(0);
            assetListMapper.updateById(assetList);

            actionRecordService.createdAction(
                "Remove", 
                "Delete", 
                "Asset List", 
                id.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Remove", 
                "Delete", 
                "Asset List", 
                id.toString(),
                "Failure"
            );
            throw new RuntimeException("No matched data in records!");
        }
    }

    public AssetList findOneById(Long id) {
        AssetList assetList2 = assetListMapper.selectById(id);
        
        assetListFile.setAssetId(Math.toIntExact(id));
        List<AssetListFile> assetListFiles = assetListFileService.getByAssetId(assetListFile);
        assetList2.setAssetListFiles(assetListFiles);
        return assetList2;
    }

    public AssetList findOne(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetList::getAssetCode, assetList.getAssetCode());
        queryWrapper.eq(AssetList::getPlaceId, assetList.getPlaceId());

        AssetList assetList2 = assetListMapper.selectOne(queryWrapper);
        return assetList2;
    }

    public AssetList findOneByAssetCode(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetList::getAssetCode, assetList.getAssetCode());
        queryWrapper.eq(AssetList::getStatu, 1);
        return assetListMapper.selectOne(queryWrapper);
    }

    public List<CostWithDeptDto> getCostWithDept() { return assetListMapper.getCostWithDept(); }


    public List<AssetYearCostDept> assetYearCostDeptFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return assetListMapper.assetYearCostDeptFind(queryWrapper);
    }

    public List<AssetItemYearMonthDto> getItemYearMonthFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.getItemYearMonthFind(queryWrapper);
    }

    public List<AssetYearCostType> assetYearCostTypeFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.assetYearCostTypeFind(queryWrapper);
    }

    public List<GroupByAssetOfTypeDto> groupByTypeFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.groupByTypeFind(queryWrapper);
    }

    public List<AssetGroupPlaceDto> getAssetGroupPlaceFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.getAssetGroupPlaceFind(queryWrapper);
    }

    public List<AssetYearQtyType> getAssetYearQtyTypeFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.getAssetYearQtyTypeFind(queryWrapper);
    }

    public List<AssetYearQtyDept> getAssetYearQtyDeptFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.getAssetYearQtyDeptFind(queryWrapper);
    }

    public List<AssetCostYearMonthDto> getAssetCostYearMonthFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.getAssetCostYearMonthFind(queryWrapper);
    }

    public List<AssetYearQtyPlaceDto> getAssetYearQtyPlaceFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.getAssetYearQtyPlaceFind(queryWrapper);
    }

    public List<AssetYearQtyPlaceDto> getAssetYearCostPlaceFind(AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = dataGlobalFilter(assetList);
        return  assetListMapper.getAssetYearCostPlaceFind(queryWrapper);
    }

    LambdaQueryWrapper<AssetList> dataGlobalFilter(AssetList assetList) {
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

        if (!assetList.getTypeIds().isEmpty()) {
            queryWrapper.in(AssetList::getTypeId, assetList.getTypeIds());
        }
       /*  if (!assetList.getPlaceIds().isEmpty()) {
            queryWrapper.in(AssetList::getPlaceId, assetList.getPlaceIds());
        }*/
        if (!assetList.getDeptIds().isEmpty()) {
            queryWrapper.in(AssetList::getDeptId, assetList.getDeptIds());
        }

        return queryWrapper;
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

    public LocalDateTime getFormat(String dateString) {
        Date date = new Date(dateString);
        Instant instant = Instant.ofEpochMilli(date.getTime());
        date = Date.from(instant);
        LocalDateTime ldt = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
        return ldt;
    }

}
