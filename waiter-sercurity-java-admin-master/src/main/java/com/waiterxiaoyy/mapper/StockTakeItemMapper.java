package com.waiterxiaoyy.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.waiterxiaoyy.dto.StockTakeItemListDTO;
import com.waiterxiaoyy.entity.StockTakeItem;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface StockTakeItemMapper extends BaseMapper<StockTakeItem> {

    String query = "SELECT si.* ," +
            "al.asset_code as assetCode, al.asset_name as assetName, " +
            "lo.place_code AS placeCode, lo.place_name AS placeName " +
            "FROM stocktake_item AS si " +
            "LEFT JOIN location AS lo ON si.place_id = lo.id " +
            "LEFT JOIN asset_list AS al ON si.asset_code = al.asset_code where si.stocktake_id = #{stockTakeId}";
    String wrapperSql = "SELECT * from ( " + query + " ) AS q where ";

    @Select(query)
    Page<StockTakeItemListDTO> listItem(Page page, @Param("stockTakeId") int stockTakeId);
}
