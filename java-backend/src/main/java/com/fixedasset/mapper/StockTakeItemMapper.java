package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.StockTakeItemListDTO;
import com.fixedasset.entity.StockTakeItem;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface StockTakeItemMapper extends BaseMapper<StockTakeItem> {
    Page<StockTakeItemListDTO> listItem(Page page, @Param("stockTakeId") int stockTakeId);
}
