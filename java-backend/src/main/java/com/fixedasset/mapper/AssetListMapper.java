package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.*;
import com.fixedasset.entity.AssetList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AssetListMapper extends BaseMapper<AssetList> {

    Page<AssetListViewDTO> pageAndList(Page page, @Param("ew") Wrapper queryWrapper);

    List<AssetListViewDTO> newReport(@Param("ew") Wrapper queryWrapper);

    List<AssetListViewDTO> pageInWriteOff(@Param("ew") Wrapper queryWrapper);

    int sumCost(@Param("ew") Wrapper queryWrapper);

    int sumCostWithSponsor(@Param("ew") Wrapper queryWrapper);

    List<CostWithDeptDto> getCostWithDept();

    List<AssetYearCostDept> assetYearCostDeptFind(@Param("ew") Wrapper queryWrapper);

    List<AssetItemYearMonthDto> getItemYearMonthFind(@Param("ew") Wrapper queryWrapper);

    List<AssetYearCostType> assetYearCostTypeFind(@Param("ew") Wrapper queryWrapper);

    List<GroupByAssetOfTypeDto>  groupByTypeFind(@Param("ew") Wrapper queryWrapper);

    List<AssetGroupPlaceDto> getAssetGroupPlaceFind(@Param("ew") Wrapper queryWrapper);

    List<AssetYearQtyType> getAssetYearQtyTypeFind(@Param("ew") Wrapper queryWrapper);

    List<AssetYearQtyDept> getAssetYearQtyDeptFind(@Param("ew") Wrapper queryWrapper);

    List<AssetCostYearMonthDto> getAssetCostYearMonthFind(@Param("ew") Wrapper queryWrapper);

    List<AssetYearQtyPlaceDto> getAssetYearQtyPlaceFind(@Param("ew") Wrapper queryWrapper);

    List<AssetYearQtyPlaceDto> getAssetYearCostPlaceFind(@Param("ew") Wrapper queryWrapper);

}
