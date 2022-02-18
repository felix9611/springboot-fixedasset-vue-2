package com.waiterxiaoyy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.waiterxiaoyy.entity.ActionRecord;
import com.waiterxiaoyy.entity.CodeType;
import com.waiterxiaoyy.mapper.ActionRecordMapper;
import com.waiterxiaoyy.mapper.CodeTypeMapper;
import com.waiterxiaoyy.service.CodeTypeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CodeTypeServiceImpl extends ServiceImpl<CodeTypeMapper, CodeType> implements CodeTypeService {

    @Resource ActionRecordMapper actionRecordMapper;

    @Resource private ActionRecord actionRecord;

    @Resource private CodeTypeMapper codeTypeMapper;

    @Resource private CodeType codeType;

    public List<CodeType> getAllList(CodeType codeType) {
        LambdaQueryWrapper<CodeType> queryWrapper = queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(CodeType::getType, codeType.getType());
        return codeTypeMapper.selectList(queryWrapper);
    }

    public void createOne(CodeType codeType) {
        codeType.setStatu(1);
        codeType.setCreated(LocalDateTime.now());
        codeTypeMapper.insert(codeType);

        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Code Type Manger");
        actionRecord.setActionData(codeType.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public void updateOne(CodeType codeType) {
        codeType.setUpdated(LocalDateTime.now());
        codeTypeMapper.updateById(codeType);

        actionRecord.setActionName("Update");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Code Type Manger");
        actionRecord.setActionData(codeType.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

    }

    public void remove(Long id) {
        codeType.setId(id);
        codeType.setStatu(0);
        codeTypeMapper.updateById(codeType);

        actionRecord.setActionName("Remove");
        actionRecord.setActionMethod("Delete");
        actionRecord.setActionFrom("Code Type Manger");
        actionRecord.setActionData(codeType.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
