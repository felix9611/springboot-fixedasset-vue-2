package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.FieldMatch;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.FieldMatchMapper;
import com.fixedasset.service.FieldMatchService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class FieldMatchServiceImpl extends ServiceImpl<FieldMatchMapper, FieldMatch> implements FieldMatchService {

    @Resource private FieldMatchMapper fieldMatchMapper;
    @Resource private ActionRecord actionRecord;
    @Resource ActionRecordMapper actionRecordMapper;

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

        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Field Match");
        actionRecord.setActionData(fieldMatch.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        fieldMatch.setCreated(LocalDateTime.now());
        fieldMatch.setStatu(1);
        fieldMatchMapper.insert(fieldMatch);
    }

    public void updateOne(FieldMatch fieldMatch) {

        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Field Match");
        actionRecord.setActionData(fieldMatch.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        fieldMatch.setCreated(LocalDateTime.now());
        fieldMatch.setStatu(1);
        fieldMatchMapper.insert(fieldMatch);
    }

    public void removeOne(FieldMatch fieldMatch) {

        actionRecord.setActionName("Remove");
        actionRecord.setActionMethod("delete");
        actionRecord.setActionFrom("Field Match");
        actionRecord.setActionData(fieldMatch.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        fieldMatch.setUpdated(LocalDateTime.now());
        fieldMatchMapper.updateById(fieldMatch);
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }

}
