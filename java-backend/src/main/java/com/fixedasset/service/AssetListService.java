package com.fixedasset.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.dto.*;
import com.fixedasset.entity.AssetList;

import java.util.List;

public interface AssetListService extends IService<AssetList> {
    String createNew(AssetList assetList);

    Page<AssetListViewDTO> newPage(Page page, LambdaQueryWrapper<AssetList> queryWrapper);

    List<AssetListViewDTO> newPageInWriteOff(LambdaQueryWrapper<AssetList> queryWrapper);

    List<AssetListViewDTO> newReport(LambdaQueryWrapper<AssetList> queryWrapper);

    void remove(Long id);

    void update(AssetList assetList);

    int sumTotal(AssetList assetList);

    int sumCostWithSponsor(AssetList assetList);

    AssetList findOne(AssetList assetList);

    AssetList findOneByAssetCode(AssetList assetList);

    AssetList findOneById(Long id);


    List<CostWithDeptDto> getCostWithDept();

    List<AssetYearCostDept> assetYearCostDeptFind(AssetList assetList);
    List<AssetItemYearMonthDto> getItemYearMonthFind(AssetList assetList);
    List<AssetYearCostType> assetYearCostTypeFind(AssetList assetList);
    List<GroupByAssetOfTypeDto> groupByTypeFind(AssetList assetList);
    List<AssetGroupPlaceDto> getAssetGroupPlaceFind(AssetList assetList);
    List<AssetYearQtyType> getAssetYearQtyTypeFind(AssetList assetList);
    List<AssetYearQtyDept> getAssetYearQtyDeptFind(AssetList assetList);
    List<AssetCostYearMonthDto> getAssetCostYearMonthFind(AssetList assetList);
    List<AssetYearQtyPlaceDto> getAssetYearQtyPlaceFind(AssetList assetList);
    List<AssetYearQtyPlaceDto> getAssetYearCostPlaceFind(AssetList assetList);


}
