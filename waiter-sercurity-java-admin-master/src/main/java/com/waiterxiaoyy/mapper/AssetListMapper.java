package com.waiterxiaoyy.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.waiterxiaoyy.dto.AssetCostYearMonthDto;
import com.waiterxiaoyy.dto.AssetListViewDTO;
import com.waiterxiaoyy.dto.GroupByAssetOfTypeDto;
import com.waiterxiaoyy.entity.AssetList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public interface AssetListMapper extends BaseMapper<AssetList> {

    String querySql = "SELECT al.* ," +
            "at.type_name AS typeName, at.type_code AS typeCode, " +
            "d.dept_name AS deptName, d.dept_code AS deptCode, " +
            "lo.place_code AS placeCode, lo.place_name AS placeName " +
            "FROM asset_list AS al " +
            "LEFT JOIN asset_type AS at ON al.type_id = at.id " +
            "LEFT JOIN department AS d ON al.dept_id = d.id " +
            "LEFT JOIN location AS lo ON al.place_id = lo.id";
    String wrapperSql = "SELECT * from ( " + querySql + " ) AS q ${ew.customSqlSegment}";


    String getCostYearMonth = "SELECT " +
            "sum(asset_list.cost) as totalCost," +
            "CONCAT(YEAR(asset_list.buy_date), '-', MONTH(asset_list.buy_date)) AS yearMonth " +
            "FROM fixedasset_springboot_vue_3.asset_list where asset_list.buy_date is not null and not(asset_list.cost = 0) and  asset_list.statu = 1 " +
            "group by YEAR(asset_list.buy_date), MONTH(asset_list.buy_date) " +
            "order by yearMonth ASC;";

    String groupByType = "SELECT at.type_name as typeName , count(*) as items " +
            "FROM asset_list as al " +
            "left join asset_type as at on al.type_id = at.id " +
            "where " +
            "al.type_id is not null and al.statu = 1 " +
            "group by type_id;";

    @Select(wrapperSql)
    Page<AssetListViewDTO> page(Page page, @Param("ew") Wrapper queryWrapper);

    @Select("SELECT sum(cost) costs FROM asset_list WHERE statu = 1")
    int sumCost();

    @Select(getCostYearMonth)
    List<AssetCostYearMonthDto> getCostYearMonth();

    @Select(groupByType)
    List<GroupByAssetOfTypeDto>  groupByType();


}
