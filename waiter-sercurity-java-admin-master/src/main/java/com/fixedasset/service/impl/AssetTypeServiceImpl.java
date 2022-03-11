package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.AssetList;
import com.fixedasset.entity.AssetType;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.AssetTypeMapper;
import com.fixedasset.service.AssetTypeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssetTypeServiceImpl extends ServiceImpl<AssetTypeMapper, AssetType> implements AssetTypeService {

    @Resource AssetTypeMapper assetTypeMapper;

    @Resource ActionRecordMapper actionRecordMapper;

    @Resource private ActionRecord actionRecord;

    public void createNew(AssetType assetType) {
        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Asset Type Manger");
        actionRecord.setActionData(assetType.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        assetTypeMapper.insert(assetType);
    }
    public void update(AssetType assetType) {
        actionRecord.setActionName("Update");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Asset Type Manger");
        actionRecord.setActionData(assetType.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        assetTypeMapper.updateById(assetType);
    }

    public void remove(AssetType assetType) {
        actionRecord.setActionName("Remove");
        actionRecord.setActionMethod("DELETE");
        actionRecord.setActionFrom("Asset Type Manger");
        actionRecord.setActionData(assetType.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        assetTypeMapper.updateById(assetType);
    }

    public AssetType getData(AssetType assetType) {
        LambdaQueryWrapper<AssetType> queryWrapper = Wrappers.lambdaQuery();
        if (StringUtils.isNotBlank(assetType.getTypeCode())) {
            queryWrapper.eq(AssetType::getTypeCode, assetType.getTypeCode());
        }
        if (StringUtils.isNotBlank(assetType.getTypeName())) {
            queryWrapper.eq(AssetType::getTypeName, assetType.getTypeName());
        }
        return assetTypeMapper.selectOne(queryWrapper);
    }



    public List<AssetType> getAll() {
        return assetTypeMapper.getALL();
    }


    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
