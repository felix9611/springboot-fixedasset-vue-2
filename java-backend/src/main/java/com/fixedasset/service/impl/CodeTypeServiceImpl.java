package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.CodeType;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.CodeTypeMapper;
import com.fixedasset.service.CodeTypeService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CodeTypeServiceImpl extends ServiceImpl<CodeTypeMapper, CodeType> implements CodeTypeService {

    @Resource private ActionRecordMapper actionRecordMapper;

    @Resource private ActionRecord actionRecord;

    @Resource private CodeTypeMapper codeTypeMapper;

    @Resource private CodeType codeType;

    public List<CodeType> getAllList(CodeType codeType) {
        return codeTypeMapper.getALL(codeType.getType());
    }

    public void batchImport(List<CodeType> codeTypes) {
        for (CodeType codeType : codeTypes) {
            this.createOne(codeType);
        }
    }

    public void createOne(CodeType codeType) {
        LambdaQueryWrapper<CodeType> queryWrapper = Wrappers.lambdaQuery();

        if (!codeType.getValueCode().isEmpty()) {
            queryWrapper.eq(CodeType::getValueCode, codeType.getValueCode());
        }
        if (!codeType.getType().isEmpty()) {
            queryWrapper.eq(CodeType::getType, codeType.getType());
        }
        queryWrapper.eq(CodeType::getStatu, 1);
        CodeType checkOne = codeTypeMapper.selectOne(queryWrapper);
        if (checkOne == null) {
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
        } else {
            throw new RuntimeException("Exist in records! Please check again!");
        }
    }

    public void updateOne(CodeType codeType) {
        LambdaQueryWrapper<CodeType> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(CodeType::getStatu, 1);
        queryWrapper.eq(CodeType::getId, codeType.getId());
        CodeType checkOne = codeTypeMapper.selectOne(queryWrapper);
        if (checkOne.getId().equals(codeType.getId())) {
            codeType.setUpdated(LocalDateTime.now());
            codeTypeMapper.updateById(codeType);

            actionRecord.setActionName("Update");
            actionRecord.setActionMethod("POST");
            actionRecord.setActionFrom("Code Type Manger");
            actionRecord.setActionData(codeType.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());
            this.createdAction(actionRecord);
        } else {
            throw new RuntimeException("Not active data in records!");
        }
    }

    public void remove(Long id) {
        LambdaQueryWrapper<CodeType> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(CodeType::getId, id);
        queryWrapper.eq(CodeType::getStatu, 1);
        CodeType checkOne = codeTypeMapper.selectOne(queryWrapper);
        if (checkOne.getId().equals(id)) {
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
        } else {
            throw new RuntimeException("Not active data in records!");
        }   
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
