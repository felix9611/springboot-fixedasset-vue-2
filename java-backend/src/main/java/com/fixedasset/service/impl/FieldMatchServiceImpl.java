package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.FieldMatch;
import com.fixedasset.mapper.FieldMatchMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.FieldMatchService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class FieldMatchServiceImpl extends ServiceImpl<FieldMatchMapper, FieldMatch> implements FieldMatchService {

    @Resource private FieldMatchMapper fieldMatchMapper;

    @Resource private ActionRecordService actionRecordService;

    public List<FieldMatch> findBqQuery(FieldMatch fieldMatch) {
        LambdaQueryWrapper<FieldMatch> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.eq(FieldMatch::getFunctionCategoryCode, fieldMatch.getFunctionCategoryCode());
        queryWrapper.eq(FieldMatch::getType, fieldMatch.getType());
        queryWrapper.eq(FieldMatch::getStatu, 1);

        return fieldMatchMapper.selectList(queryWrapper);
    }

    public List<FieldMatch> findByCategory(String category) {

        LambdaQueryWrapper<FieldMatch> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(FieldMatch::getFunctionCategoryCode, category);
        queryWrapper.eq(FieldMatch::getStatu, 1);

        return fieldMatchMapper.selectList(queryWrapper);
    }

    public void createNaw(FieldMatch fieldMatch) {
        LambdaQueryWrapper<FieldMatch> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(FieldMatch::getStatu, 1);
        queryWrapper.eq(FieldMatch::getFunctionCategory, fieldMatch.getFunctionCategory());
        queryWrapper.eq(FieldMatch::getFunctionCategoryCode, fieldMatch.getFunctionCategoryCode());
        queryWrapper.eq(FieldMatch::getFieldName, fieldMatch.getFieldName());
        
        FieldMatch exist = fieldMatchMapper.selectOne(queryWrapper);

        if (exist == null) {
            fieldMatch.setCreated(LocalDateTime.now());
            fieldMatch.setStatu(1);
            fieldMatchMapper.insert(fieldMatch);

            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Excel Field Match", 
                fieldMatch.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Excel Field Match", 
                fieldMatch.toString(), 
                "Failure"
            );
            throw new RuntimeException("Exist in records!");
        }

    }

    public void updateOne(FieldMatch fieldMatch) {

        LambdaQueryWrapper<FieldMatch> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(FieldMatch::getStatu, 1);
        queryWrapper.eq(FieldMatch::getId, fieldMatch.getId());
        FieldMatch exist = fieldMatchMapper.selectOne(queryWrapper);

        if (exist != null) {
            fieldMatch.setUpdated(LocalDateTime.now());
            fieldMatchMapper.updateById(fieldMatch);

            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Excel Field Match", 
                fieldMatch.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Excel Field Match", 
                fieldMatch.toString(), 
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }
    }

    public void removeOne(FieldMatch fieldMatch) {

        LambdaQueryWrapper<FieldMatch> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(FieldMatch::getStatu, 1);
        queryWrapper.eq(FieldMatch::getId, fieldMatch.getId());
        FieldMatch exist = fieldMatchMapper.selectOne(queryWrapper);

        if (exist != null) {
            fieldMatch.setStatu(0);
            fieldMatch.setUpdated(LocalDateTime.now());
            fieldMatchMapper.updateById(fieldMatch);

            actionRecordService.createdAction(
                "Void", 
                "Delete", 
                "Excel Field Match", 
                fieldMatch.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Void", 
                "Delete", 
                "Excel Field Match", 
                fieldMatch.toString(), 
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }
    }
}
