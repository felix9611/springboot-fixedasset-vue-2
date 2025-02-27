package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.dto.BudgetListDto;
import com.fixedasset.entity.BudgetList;
import com.fixedasset.service.BudgetListService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Tag(name = "Budget")
@RestController
@RequestMapping("/base/budget")
public class BudgetListController {
    @Resource private BudgetListService budgetListService;

    @Operation(summary = "Cteate")
    @PostMapping("/create")
    public Result create(@RequestBody BudgetList budgetList) {
        budgetListService.create(budgetList);
        return Result.succ(budgetList);
    }

    @Operation(summary = "Update")
    @PostMapping("/update")
    public Result update(@RequestBody BudgetList budgetList) {
        budgetListService.update(budgetList);
        return Result.succ(budgetList);
    }

    @Operation(summary = "Get one by id")
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(budgetListService.getOne(id));
    }

    @Operation(summary = "Void one by id")
    @DeleteMapping("/remove/{id}")
    public Result remove(@PathVariable("id") Long id) {
        budgetListService.remove(id);
        return Result.succ(id);
    }

    @Operation(summary = "Page and list")
    @PostMapping("/listAll")
    public Result listAll(@RequestBody BudgetList budgetList) {
        Page page = new Page(budgetList.getPage(), budgetList.getLimit());
        LambdaQueryWrapper<BudgetList> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isBlank(budgetList.getBudgetName())) {
            queryWrapper.like(BudgetList::getBudgetName, budgetList.getBudgetName());
        }

        queryWrapper.eq(BudgetList::getStatu, 1);
        queryWrapper.orderByAsc(BudgetList::getYear);

        Page<BudgetListDto> iPage = budgetListService.newPage(page, queryWrapper);
        return Result.succ(iPage);
    }
}
