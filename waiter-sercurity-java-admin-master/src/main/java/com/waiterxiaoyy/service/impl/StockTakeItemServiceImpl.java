package com.waiterxiaoyy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.waiterxiaoyy.dto.StockTakeFormListDTO;
import com.waiterxiaoyy.dto.StockTakeItemListDTO;
import com.waiterxiaoyy.entity.ActionRecord;
import com.waiterxiaoyy.entity.StockTake;
import com.waiterxiaoyy.entity.StockTakeItem;
import com.waiterxiaoyy.mapper.ActionRecordMapper;
import com.waiterxiaoyy.mapper.StockTakeItemMapper;
import com.waiterxiaoyy.mapper.StockTakeMapper;
import com.waiterxiaoyy.service.StockTakeItemService;
import com.waiterxiaoyy.service.StockTakeService;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@Service
public class StockTakeItemServiceImpl extends ServiceImpl<StockTakeItemMapper, StockTakeItem> implements StockTakeItemService {

    @Resource ActionRecordMapper actionRecordMapper;

    @Resource private ActionRecord actionRecord;

    @Resource private  StockTakeItemMapper stockTakeItemMapper;

    @Resource private StockTakeMapper stockTakeMapper;

    public Page<StockTakeItemListDTO> newPage(Page page, StockTakeItem stockTakeItem) {

        /*
        StocktakelistEntity stocktakelistEntity = stocktakelistMapper.selectById(listId);
        if (stocktakelistEntity == null) {
            throw new BusinessException("Get data failed!");
        }
         */
        StockTake stockTake = stockTakeMapper.selectById(stockTakeItem.getStockTakeId());
        if (stockTake == null) {
            return null;
        }
        LambdaQueryWrapper<StockTakeItem> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(StockTakeItem::getStockTakeId, stockTakeItem.getStockTakeId());
        Page<StockTakeItemListDTO> iPage = stockTakeItemMapper.listItem(page, stockTakeItem.getStockTakeId());
        if (!CollectionUtils.isEmpty(iPage.getRecords())) {
            iPage.getRecords().parallelStream().forEach(entity -> entity.setStockTakeId(stockTake.getId().intValue()));
        }
        return iPage;
        // return stockTakeItemMapper.listItem(page, queryWrapper);
    }

    public void saveStock(StockTakeItem stockTakeItem) {
        stockTakeItem.setCheckTime(LocalDateTime.now());
        stockTakeItemMapper.insert(stockTakeItem);

        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Stocktake Item");
        actionRecord.setActionData(stockTakeItem.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
