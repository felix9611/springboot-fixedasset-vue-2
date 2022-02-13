package com.waiterxiaoyy.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.waiterxiaoyy.dto.AssetListViewDTO;
import com.waiterxiaoyy.entity.AssetList;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

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

    @Select(wrapperSql)
    Page<AssetListViewDTO> page(Page page, @Param("ew") Wrapper queryWrapper);

    @Select("SELECT sum(cost) costs FROM asset_list WHERE statu = 1")
    int sumCost();
}
