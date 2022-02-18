package com.waiterxiaoyy.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.waiterxiaoyy.dto.StockTakeItemListDTO;
import com.waiterxiaoyy.entity.StockTakeItem;

public interface StockTakeItemService extends IService<StockTakeItem> {
    Page<StockTakeItemListDTO> newPage(Page page, StockTakeItem stockTakeItem);

    void saveStock(StockTakeItem stockTakeItem);

}
