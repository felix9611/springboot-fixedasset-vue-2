package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.*;
import com.fixedasset.entity.AssetList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AssetListMapper extends BaseMapper<AssetList> {

    Page<AssetListViewDTO> pageAndList(Page page, @Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetListViewDTO> newReport(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetListViewDTO> pageInWriteOff(@Param("ew") Wrapper<AssetList> queryWrapper);

    int sumCost(@Param("ew") Wrapper<AssetList> queryWrapper);

    int sumCostWithSponsor(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<CostWithDeptDto> getCostWithDept();

    List<AssetYearCostDept> assetYearCostDeptFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetItemYearMonthDto> getItemYearMonthFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetYearCostType> assetYearCostTypeFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<GroupByAssetOfTypeDto>  groupByTypeFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetGroupPlaceDto> getAssetGroupPlaceFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetYearQtyType> getAssetYearQtyTypeFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetYearQtyDept> getAssetYearQtyDeptFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetCostYearMonthDto> getAssetCostYearMonthFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetYearQtyPlaceDto> getAssetYearQtyPlaceFind(@Param("ew") Wrapper<AssetList> queryWrapper);

    List<AssetYearQtyPlaceDto> getAssetYearCostPlaceFind(@Param("ew") Wrapper<AssetList> queryWrapper);

}
