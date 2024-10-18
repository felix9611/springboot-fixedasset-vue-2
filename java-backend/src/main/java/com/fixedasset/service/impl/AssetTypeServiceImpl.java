package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.AssetType;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.AssetTypeMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.AssetTypeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssetTypeServiceImpl extends ServiceImpl<AssetTypeMapper, AssetType> implements AssetTypeService {

    @Resource AssetTypeMapper assetTypeMapper;

    @Resource private ActionRecordService actionRecordService;


    public void batchImport(List<AssetType> assetTypes) {
        for (AssetType assetType : assetTypes) {
            createNew(assetType);
        }
    }

    public void createNew(AssetType assetType) {
        LambdaQueryWrapper<AssetType> queryWrapper = Wrappers.lambdaQuery();
        if (StringUtils.isNotBlank(assetType.getTypeCode())) {
            queryWrapper.eq(AssetType::getTypeCode, assetType.getTypeCode());
        }
        queryWrapper.eq(AssetType::getStatu, 1);
        AssetType checkOne = assetTypeMapper.selectOne(queryWrapper);
        if (checkOne == null ) {
                assetType.setCreated(LocalDateTime.now());
                assetType.setStatu(1);
                assetTypeMapper.insert(assetType);

                actionRecordService.createdAction(
                    "Save", 
                    "POST", 
                    "Asset Type Manger", 
                    assetType.toString(), 
                    "Success"
                );
        } else {
            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Asset Type Manger", 
                assetType.toString(), 
                "Failure"
            );
            throw new RuntimeException("Exist in records!");
        }
    }
    public void update(AssetType assetType) {
        LambdaQueryWrapper<AssetType> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetType::getStatu, 1);
        queryWrapper.eq(AssetType::getId, assetType.getId());
        AssetType checkOne = assetTypeMapper.selectOne(queryWrapper);
        if (checkOne.getId().equals(assetType.getId()) ) {

            assetType.setUpdated(LocalDateTime.now());
            assetTypeMapper.updateById(assetType);

            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Asset Type Manger", 
                assetType.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Asset Type Manger", 
                assetType.toString(), 
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }
    }

    public void remove(AssetType assetType) {
        LambdaQueryWrapper<AssetType> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetType::getStatu, 1);
        queryWrapper.eq(AssetType::getId, assetType.getId());
        AssetType checkOne = assetTypeMapper.selectOne(queryWrapper);
        if (checkOne.getId().equals(assetType.getId()) ) {
            assetType.setStatu(0);
            assetType.setUpdated(LocalDateTime.now());
            assetTypeMapper.updateById(assetType);

            actionRecordService.createdAction(
                "Remove", 
                "DELETE", 
                "Asset Type Manger", 
                assetType.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Remove", 
                "DELETE", 
                "Asset Type Manger", 
                assetType.toString(), 
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }
    }

    public AssetType getData(AssetType assetType) {
        LambdaQueryWrapper<AssetType> queryWrapper = Wrappers.lambdaQuery();
        if (StringUtils.isNotBlank(assetType.getTypeCode())) {
            queryWrapper.eq(AssetType::getTypeCode, assetType.getTypeCode());
        }
        if (StringUtils.isNotBlank(assetType.getTypeName())) {
            queryWrapper.eq(AssetType::getTypeName, assetType.getTypeName());
        }
        queryWrapper.eq(AssetType::getStatu, 1);
        return assetTypeMapper.selectOne(queryWrapper);
    }

    public List<AssetType> getAll() {
        LambdaQueryWrapper<AssetType> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetType::getStatu, 1);
        return assetTypeMapper.selectList(queryWrapper); // assetTypeMapper.getALL();
    }
}
