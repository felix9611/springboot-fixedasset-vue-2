package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.dto.StockTakeFormListDTO;
import com.fixedasset.entity.StockTake;
import com.fixedasset.service.StockTakeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Tag(name = "Stock Take")
@RestController
@RequestMapping("/stock/stock_take")
public class StockTakeController extends BaseController {
    @Resource private StockTakeService stockTakeService;

    @Operation(summary = "Create")
    @PostMapping("/create")
    public Result create(@RequestBody StockTake stockTake) {
        stockTakeService.create(stockTake);
        return Result.succ(stockTake);
    }

    @Operation(summary = "Page and list")
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

    @Operation(summary = "Get one by id")
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(stockTakeService.getById(id));
    }

    @Operation(summary = "Void one by id")
    @DeleteMapping("/remove/{id}")
    public  Result remove(@PathVariable("id") Long id) {
        stockTakeService.remove(id);
        return Result.succ(id);
    }

    @Operation(summary = "Finish one by id")
    @DeleteMapping("/finish/{id}")
    public  Result finished(@PathVariable("id") Long id) {
        stockTakeService.finish(id);
        return Result.succ(id);
    }

    @Operation(summary = "Get all stock take")
    @GetMapping("/getAllST")
    public Result getAll() {
        return Result.succ(stockTakeService.getAllActive());
    }

    @Operation(summary = "Get all Finished stock take")
    @GetMapping("/getAllFinishedST")
    public Result getAllFinished() {
        return Result.succ(stockTakeService.getAllActiveFinish());
    }

    @Operation(summary = "Upload Stock take record")
    @PostMapping("/upload")
    public Result uploadExcel(@RequestBody StockTake stockTake) {
        stockTakeService.uploadStockTakeReocrd(stockTake);
        return Result.succ(stockTake);
        
    }

}
