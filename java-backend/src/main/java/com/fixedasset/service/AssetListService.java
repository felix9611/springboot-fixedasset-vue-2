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

    void remove(Long id);

    void update(AssetList assetList);

    int sumTotal(AssetList assetList);

    int sumCostWithSponsor(AssetList assetList);

    AssetList findOne(AssetList assetList);

    AssetList findOneByAssetCode(AssetList assetList);

    List<AssetCostYearMonthDto> getCostYearMonth();

    List<AssetItemYearMonthDto> getItemYearMonth();

    List<GroupByAssetOfTypeDto> groupByType();

    List<AssetGroupDeptDto> getAssetGroupDept();

    List<AssetGroupPlaceDto> getAssetGroupPlace();

    List<CostWithDeptDto> getCostWithDept();

}
