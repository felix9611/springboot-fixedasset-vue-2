package com.waiterxiaoyy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.waiterxiaoyy.dto.StockTakeFormListDTO;
import com.waiterxiaoyy.entity.ActionRecord;
import com.waiterxiaoyy.entity.StockTake;
import com.waiterxiaoyy.mapper.ActionRecordMapper;
import com.waiterxiaoyy.mapper.StockTakeMapper;
import com.waiterxiaoyy.service.StockTakeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StockTakeServiceImpl extends ServiceImpl<StockTakeMapper, StockTake> implements StockTakeService {

    @Resource private StockTake stockTake;

    @Resource private StockTakeMapper stockTakeMapper;

    @Resource private ActionRecordMapper actionRecordMapper;

    @Resource private ActionRecord actionRecord;

    public void create(StockTake stockTake) {
        stockTake.setActive(1);
        stockTake.setCreatedTime(LocalDateTime.now());
        stockTakeMapper.insert(stockTake);

        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Stock Take");
        actionRecord.setActionData(stockTake.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public Page<StockTakeFormListDTO> newPage(Page page, LambdaQueryWrapper<StockTake> queryWrapper) {
        return stockTakeMapper.newPage(page, queryWrapper);
    }

    public List<StockTake> getAllActive() {
        return stockTakeMapper.getALL();
    }

    public List<StockTake> getAllActiveFinish() {
        return stockTakeMapper.getALLFinished();
    }

    public void remove(Long id) {
        stockTake.setId(id);
        stockTake.setActive(0);
        stockTake.setFinishTime(LocalDateTime.now());
        stockTakeMapper.updateById(stockTake);

        actionRecord.setActionName("Stop Stock take");
        actionRecord.setActionMethod("Delete");
        actionRecord.setActionFrom("Stock Take");
        actionRecord.setActionData(stockTake.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
