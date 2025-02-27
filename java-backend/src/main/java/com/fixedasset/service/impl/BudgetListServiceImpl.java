package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.dto.AssetListViewDTO;
import com.fixedasset.dto.BudgetListDto;
import com.fixedasset.entity.AssetList;
import com.fixedasset.entity.BudgetList;
import com.fixedasset.mapper.BudgetListMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.BudgetListService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.management.RuntimeErrorException;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class BudgetListServiceImpl extends ServiceImpl<BudgetListMapper, BudgetList> implements BudgetListService {

    @Resource private BudgetListMapper budgetListMapper;
    @Resource private BudgetList budgetList;
    @Resource private ActionRecordService actionRecordService;

    public void create(BudgetList budgetList) {
        LambdaQueryWrapper<BudgetList> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(BudgetList::getBudgetName, budgetList.getBudgetName());
        queryWrapper.eq(BudgetList::getYear, budgetList.getYear());
        queryWrapper.eq(BudgetList::getMonth, budgetList.getMonth());
        queryWrapper.eq(BudgetList::getStatu, 1);

        BudgetList oldData = budgetListMapper.selectOne(queryWrapper);

        if (oldData == null) {
            budgetList.setBudgetNo(numberRandom());
            budgetList.setStatu(1);
            budgetList.setCreated(LocalDateTime.now());
            budgetListMapper.insert(budgetList);

            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Budget Manger", 
                budgetList.toString(), 
                "Success"
            );
            
        } else {
            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Budget Manger", 
                budgetList.toString(), 
                "Failure"
            );
            throw new RuntimeException("Exist this record!");
        }
   
    }

    public void remove(Long id) {
        LambdaQueryWrapper<BudgetList> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(BudgetList::getId, id);
        queryWrapper.eq(BudgetList::getStatu, 1);
        BudgetList oldData = budgetListMapper.selectOne(queryWrapper);

        if (oldData.getId().equals(id)) {
            budgetList.setId(id);
            budgetList.setStatu(0);
            budgetList.setUpdated(LocalDateTime.now());
            budgetListMapper.updateById(budgetList);

            actionRecordService.createdAction(
                "Void", 
                "DELETE", 
                "Budget Manger", 
                budgetList.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Void", 
                "DELETE",
                "Budget Manger", 
                budgetList.toString(),
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }
    }

    public void update(BudgetList budgetList) {
        LambdaQueryWrapper<BudgetList> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(BudgetList::getId, budgetList.getId());
        queryWrapper.eq(BudgetList::getStatu, 1);
        BudgetList oldData = budgetListMapper.selectOne(queryWrapper);

        if (oldData.getId().equals(budgetList.getId())) {
            budgetList.setUpdated(LocalDateTime.now());
            budgetListMapper.updateById(budgetList);

            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Budget Manger", 
                budgetList.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Budget Manger", 
                budgetList.toString(), 
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }

    }

    public BudgetList getOne(Long id) {
        LambdaQueryWrapper<BudgetList> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(BudgetList::getId, id);
        queryWrapper.eq(BudgetList::getStatu, 1);
        return budgetListMapper.selectOne(queryWrapper);
    }

    public Page<BudgetListDto> newPage(Page page, LambdaQueryWrapper<BudgetList> queryWrapper){
        return budgetListMapper.pageAndList(page, queryWrapper);
    }

    public String numberRandom() {
        Random random = new Random();
        Long tenDigitNumber = 1000000000L + (long)(random.nextDouble() * 9000000000L);
        String numberAsString = String.valueOf(tenDigitNumber);
        return numberAsString;
    }
}
