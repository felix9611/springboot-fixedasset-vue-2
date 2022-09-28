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

    String querySql = "SELECT al.* ," +
            "at.type_name AS typeName, at.type_code AS typeCode, " +
            "d.dept_name AS deptName, d.dept_code AS deptCode, " +
            "lo.place_code AS placeCode, lo.place_name AS placeName " +
            "FROM asset_list AS al " +
            "LEFT JOIN asset_type AS at ON al.type_id = at.id " +
            "LEFT JOIN department AS d ON al.dept_id = d.id " +
            "LEFT JOIN location AS lo ON al.place_id = lo.id";
    String wrapperSql = "SELECT * from ( " + querySql + " ) AS q ${ew.customSqlSegment}";

    String querySqlInWriteOff = "SELECT al.* ," +
            "at.type_name AS typeName, at.type_code AS typeCode, " +
            "d.dept_name AS deptName, d.dept_code AS deptCode, " +
            "lo.place_code AS placeCode, lo.place_name AS placeName , " +
            "wo.reason As writeOffReason, wo.last_day AS writeOffTime " +
            "FROM asset_list AS al " +
            "LEFT JOIN asset_type AS at ON al.type_id = at.id " +
            "LEFT JOIN department AS d ON al.dept_id = d.id " +
            "LEFT JOIN location AS lo ON al.place_id = lo.id " +
            "LEFT JOIN write_off AS wo ON al.id = wo.asset_id";
    String wrapperSqlInWriteOff  = "SELECT * from ( " + querySqlInWriteOff + " ) AS q ${ew.customSqlSegment}";



    String getCostYearMonth = "SELECT " +
            "sum(cost) as totalCost," +
            "CONCAT(YEAR(asset_list.buy_date), '-', MONTH(buy_date)) AS yearMonth " +
            "FROM asset_list where buy_date is not null and not(cost = 0) and statu = 1 " +
            "and sponsor = 0 and sponsor_name is null " +
            "group by YEAR(buy_date), MONTH(buy_date) " +
            "order by YEAR(buy_date), MONTH(buy_date)  ASC;";

    String getCostYearMonthSponsor = "SELECT " +
            "sum(asset_list.cost) as totalCost," +
            "CONCAT(YEAR(buy_date), '-', MONTH(buy_date)) AS yearMonth " +
            "FROM asset_list where buy_date is not null and not(cost = 0) and statu = 1 " +
            "and sponsor = 1 and sponsor_name is null " +
            "group by YEAR(buy_date), MONTH(buy_date) " +
            "order by YEAR(buy_date), MONTH(buy_date)  ASC;";

    String groupByType = "SELECT at.type_name as typeName , count(*) as items " +
            "FROM asset_list as al " +
            "left join asset_type as at on al.type_id = at.id " +
            "where " +
            "al.type_id is not null and al.statu = 1 " +
            "group by type_id;";

    String groupByDept = "SELECT count(*) as items, d.dept_name as deptName " +
            "FROM asset_list " +
            "left join department as d on asset_list.dept_id = d.id " +
            "where asset_list.statu = 1 " +
            "group by asset_list.dept_id;";

    String groupByPlace = "SELECT count(*) as items, loc.place_name as placeName " +
            "FROM asset_list as al " +
            "left join location as loc on al.place_id = loc.id " +
            "where al.statu = 1 and al.sponsor = 0 and al.sponsor_name is null " +
            "group by al.place_id;";
    String costWithDept = "SELECT sum(al.cost) as totalCost, d.dept_name as deptName " +
            "FROM asset_list as al " +
            "left join department as d on al.dept_id = d.id " +
            "where al.statu = 1 and al.sponsor = 0 and al.sponsor_name is null " +
            "group by al.dept_id;";

    String costWithType = "SELECT sum(al.cost) as totalCost, at.type_name as typeName " +
            "FROM asset_list as al " +
            "left join asset_type as at on al.type_id = at.id " +
            "where al.statu = 1 and al.sponsor = 0 and al.sponsor_name is null " +
            "group by al.dept_id;";

    @Select(wrapperSql)
    Page<AssetListViewDTO> page(Page page, @Param("ew") Wrapper queryWrapper);

    @Select(wrapperSql)
    List<AssetListViewDTO> newReport(@Param("ew") Wrapper queryWrapper);

    @Select(wrapperSqlInWriteOff)
    List<AssetListViewDTO> pageInWriteOff(@Param("ew") Wrapper queryWrapper);

    String sumCostQuery = "SELECT sum(cost) costs FROM asset_list ${ew.customSqlSegment}";
    @Select(sumCostQuery )
    int sumCost(@Param("ew") Wrapper queryWrapper);

    String sponsorQuery = "SELECT IF(statu = 1 and sponsor = 1 and sponsor_name is not null, sum(cost), 0) costs " +
            "FROM asset_list ${ew.customSqlSegment}";
    @Select(sponsorQuery)
    int sumCostWithSponsor(@Param("ew") Wrapper queryWrapper);

    @Select(costWithDept)
    List<CostWithDeptDto> getCostWithDept();

    String assetYearCostDeptFindQuery  = "SELECT sum(cost) as costs, CONCAT(YEAR(asset_list.buy_date), '-', MONTH(asset_list.buy_date)) AS yearMonth, " +
            "dept.dept_name as deptName " +
            "FROM fixedasset_springboot_vue_3.asset_list  " +
            "left join department as dept on asset_list.dept_id = dept.id " +
            " ${ew.customSqlSegment} " +
            "group by year(asset_list.buy_date), week(asset_list.buy_date), dept_id  " +
            "order by year(asset_list.buy_date), week(asset_list.buy_date), dept_id";
    @Select(assetYearCostDeptFindQuery)
    List<AssetYearCostDept> assetYearCostDeptFind(@Param("ew") Wrapper queryWrapper);

    String getItemYearMonthFind = "SELECT " +
            "count(*) as items," +
            "CONCAT(YEAR(buy_date), '-', MONTH(buy_date)) AS yearMonth " +
            "FROM asset_list " +  // where buy_date is not null and not(cost = 0) and  asset_list.statu = 1 " +
            " ${ew.customSqlSegment} " +
            "group by YEAR(buy_date), MONTH(buy_date) " +
            "order by YEAR(buy_date), MONTH(buy_date)  ASC;";
    @Select(getItemYearMonthFind)
    List<AssetItemYearMonthDto> getItemYearMonthFind(@Param("ew") Wrapper queryWrapper);

    String assetYearCostTypeFindQuery = "SELECT sum(cost) as costs,CONCAT(YEAR(buy_date), '-', MONTH(buy_date)) AS yearMonth , at.type_name as typeName\n" +
            "FROM asset_list " +
            "left join asset_type as at on asset_list.type_id = at.id " +
            " ${ew.customSqlSegment} " +
            "group by YEAR(buy_date), MONTH(buy_date) , type_id " +
            "order by YEAR(buy_date), MONTH(buy_date)  ASC;";

    @Select(assetYearCostTypeFindQuery)
    List<AssetYearCostType> assetYearCostTypeFind(@Param("ew") Wrapper queryWrapper);

    String groupByTypeFind = "SELECT at.type_name as typeName , count(*) as items " +
            "FROM asset_list as al " +
            "left join asset_type as at on al.type_id = at.id " +
            " ${ew.customSqlSegment} " +
            "group by type_id;";
    @Select(groupByTypeFind)
    List<GroupByAssetOfTypeDto>  groupByTypeFind(@Param("ew") Wrapper queryWrapper);

    String groupByPlaceFind = "SELECT count(*) as items, loc.place_name as placeName " +
            "FROM asset_list as al " +
            "left join location as loc on al.place_id = loc.id " +
            " ${ew.customSqlSegment} " +
            "group by al.place_id;";
    @Select(groupByPlaceFind)
    List<AssetGroupPlaceDto> getAssetGroupPlaceFind(@Param("ew") Wrapper queryWrapper);
    String assetYearQtyTypeQueryFind = "SELECT count(*) as items,CONCAT(YEAR(buy_date), '-', MONTH(buy_date)) AS yearMonth , at.type_name as typeName " +
            "FROM asset_list " +
            "left join asset_type as at on asset_list.type_id = at.id " +
            " ${ew.customSqlSegment} " +
            "group by YEAR(buy_date), MONTH(buy_date) , type_id " +
            "order by YEAR(buy_date), MONTH(buy_date)  ASC;";

    @Select(assetYearQtyTypeQueryFind)
    List<AssetYearQtyType> getAssetYearQtyTypeFind(@Param("ew") Wrapper queryWrapper);

    String assetYearQtyDeptQueryFind = "SELECT count(*) as items,CONCAT(YEAR(buy_date), '-', MONTH(buy_date)) AS yearMonth , dept.dept_name as deptName " +
            "FROM asset_list " +
            "left join department as dept on asset_list.dept_id = dept.id " +
            " ${ew.customSqlSegment} " +
            "group by YEAR(buy_date), MONTH(buy_date) , type_id " +
            "order by YEAR(buy_date), MONTH(buy_date)  ASC;";

    @Select(assetYearQtyDeptQueryFind)
    List<AssetYearQtyDept> getAssetYearQtyDeptFind(@Param("ew") Wrapper queryWrapper);


    String AssetCostYearMonth = "SELECT sum(cost) as costs ,CONCAT(YEAR(buy_date), '-', MONTH(buy_date)) as yearMonth FROM fixedasset_springboot_vue_3.asset_list " +
            " ${ew.customSqlSegment} " +
            "group by YEAR(buy_date), MONTH(buy_date) " +
            "order by YEAR(buy_date),  MONTH(buy_date);";
    @Select(AssetCostYearMonth)
    List<AssetCostYearMonthDto> getAssetCostYearMonthFind(@Param("ew") Wrapper queryWrapper);

    String assetYearQtyPlaceQueryFind = "SELECT count(*) as items, location.place_name as placeName , YEAR(buy_date) as years, MONTH(buy_date) as months " +
            "FROM fixedasset_springboot_vue_3.asset_list " +
            "left join location on asset_list .place_id = location.id " +
            " ${ew.customSqlSegment} group by location.place_name, YEAR(buy_date), MONTH(buy_date) order by buy_date";
    @Select(assetYearQtyPlaceQueryFind)
    List<AssetYearQtyPlaceDto> getAssetYearQtyPlaceFind(@Param("ew") Wrapper queryWrapper);

    String assetYearCostPlaceQueryFind = "SELECT sum(cost) as costs, location.place_name as placeName , YEAR(buy_date) as years, MONTH(buy_date) as months " +
            "FROM fixedasset_springboot_vue_3.asset_list " +
            "left join location on asset_list .place_id = location.id " +
            " ${ew.customSqlSegment} group by location.place_name, YEAR(buy_date), MONTH(buy_date) order by buy_date";
    @Select(assetYearCostPlaceQueryFind)
    List<AssetYearQtyPlaceDto> getAssetYearCostPlaceFind(@Param("ew") Wrapper queryWrapper);

}
