package com.fixedasset.controller;

import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.BudgetList;
import com.fixedasset.service.BudgetListService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/base/budget")
public class BudgetListController {
    @Resource private BudgetListService budgetListService;

    @PostMapping("/create")
    public Result create(@RequestBody BudgetList budgetList) {
        budgetListService.create(budgetList);
        return Result.succ(budgetList);
    }
}
