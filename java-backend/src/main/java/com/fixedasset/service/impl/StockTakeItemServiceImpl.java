package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.dto.StockTakeFormListDTO;
import com.fixedasset.dto.StockTakeItemListDTO;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.AssetList;
import com.fixedasset.entity.StockTake;
import com.fixedasset.entity.StockTakeItem;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.StockTakeItemMapper;
import com.fixedasset.mapper.StockTakeMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.AssetListService;
import com.fixedasset.service.StockTakeItemService;
import com.fixedasset.service.StockTakeService;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StockTakeItemServiceImpl extends ServiceImpl<StockTakeItemMapper, StockTakeItem> implements StockTakeItemService {

    @Resource private ActionRecordService actionRecordService;

    @Resource private  StockTakeItemMapper stockTakeItemMapper;

    @Resource private StockTakeMapper stockTakeMapper;

    @Resource private AssetListService assetListService;


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

    

            AssetList assetList = new AssetList();
            assetList.setAssetCode(stockTakeItem.getAssetCode());
            assetList.setPlaceId(stockTakeItem.getPlaceId());
            AssetList assetListRes = assetListService.findOneByAssetCode(assetList);

            if (stockTakeItem.getPlaceId() == assetListRes.getPlaceId()) {
                stockTakeItem.setStatus("Exist");
            } else {
                stockTakeItem.setStatus("Incorrect location OR does not exist");
            }

            stockTakeItem.setAssetId(Math.toIntExact(assetListRes.getId()));
            stockTakeItem.setCheckTime(LocalDateTime.now());
            stockTakeItemMapper.insert(stockTakeItem);

            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Stocktake Item", 
                stockTakeItem.toString(), 
                "Success"
            );
        
    }
}
