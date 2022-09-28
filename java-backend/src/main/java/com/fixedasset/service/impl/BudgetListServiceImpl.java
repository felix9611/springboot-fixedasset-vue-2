package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.BudgetList;
import com.fixedasset.mapper.BudgetListMapper;
import com.fixedasset.service.BudgetListService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@Service
public class BudgetListServiceImpl extends ServiceImpl<BudgetListMapper, BudgetList> implements BudgetListService {

    @Resource private BudgetListMapper budgetListMapper;
    @Resource private BudgetList budgetList;

    public void create(BudgetList budgetList) {
        budgetList.setStatu(1);
        budgetList.setCreated(LocalDateTime.now());
        budgetListMapper.insert(budgetList);
    }

    public void remove(Long id) {
        budgetList.setId(id);
        budgetList.setStatu(0);
        budgetListMapper.updateById(budgetList);
    }

    public void update(BudgetList budgetList) {
        budgetList.setUpdated(LocalDateTime.now());
        budgetListMapper.updateById(budgetList);
    }

    public BudgetList getOne(Long id) {
        return budgetListMapper.selectById(id);
    }


}
