package com.fixedasset.service;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.dto.StockTakeItemListDTO;
import com.fixedasset.entity.StockTakeItem;

public interface StockTakeItemService extends IService<StockTakeItem> {
    Page<StockTakeItemListDTO> newPage(Page page, StockTakeItem stockTakeItem);

    void saveStock(StockTakeItem stockTakeItem);

}
