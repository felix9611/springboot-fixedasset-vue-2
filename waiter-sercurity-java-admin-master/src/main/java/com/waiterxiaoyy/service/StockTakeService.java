package com.waiterxiaoyy.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.waiterxiaoyy.dto.StockTakeFormListDTO;
import com.waiterxiaoyy.entity.StockTake;

import java.util.List;

public interface StockTakeService extends IService<StockTake> {
    void create(StockTake stockTake);

    List<StockTake> getAllActive();

    List<StockTake> getAllActiveFinish();

    void remove(Long id);

    Page<StockTakeFormListDTO> newPage(Page page, LambdaQueryWrapper<StockTake> queryWrapper);
}
