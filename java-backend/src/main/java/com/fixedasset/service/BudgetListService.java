package com.fixedasset.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.dto.BudgetListDto;
import com.fixedasset.entity.BudgetList;

public interface BudgetListService extends IService<BudgetList> {

    void create(BudgetList budgetList);
    void remove(Long id);
    BudgetList getOne(Long id);
    void update(BudgetList budgetList);
    Page<BudgetListDto> newPage(Page page, LambdaQueryWrapper<BudgetList> queryWrapper);
}
