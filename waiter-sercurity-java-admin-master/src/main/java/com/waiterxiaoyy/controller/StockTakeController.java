package com.waiterxiaoyy.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.waiterxiaoyy.common.lang.Result;
import com.waiterxiaoyy.dto.StockTakeFormListDTO;
import com.waiterxiaoyy.entity.StockTake;
import com.waiterxiaoyy.service.StockTakeService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/stock/stock_take")
public class StockTakeController extends BaseController {
    @Resource private StockTakeService stockTakeService;

    @PostMapping("/create")
    public Result create(@RequestBody StockTake stockTake) {
        stockTakeService.create(stockTake);
        return Result.succ(stockTake);
    }

    @PostMapping("/listAll")
    public Result listAll(@RequestBody StockTake stockTake) {
        Page page = new Page(stockTake.getPage(), stockTake.getLimit());
        LambdaQueryWrapper<StockTake> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isEmpty(stockTake.getActionName())) {
            queryWrapper.like(StockTake::getActionName, stockTake.getActionName());
        }

        // queryWrapper.eq(StockTake::getActive, 1);

        Page<StockTakeFormListDTO> iPage = stockTakeService.newPage(page, queryWrapper);
        return Result.succ(iPage);
    }
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(stockTakeService.getById(id));
    }


    @DeleteMapping("/remove/{id}")
    public  Result remove(@PathVariable("id") Long id) {
        stockTakeService.remove(id);
        return Result.succ(id);
    }

    @GetMapping("/getAllST")
    public Result getAll() {
        return Result.succ(stockTakeService.getAllActive());
    }

    @GetMapping("/getAllFinishedST")
    public Result getAllFinished() {
        return Result.succ(stockTakeService.getAllActiveFinish());
    }

}
