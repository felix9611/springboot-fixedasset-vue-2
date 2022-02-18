package com.waiterxiaoyy.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.waiterxiaoyy.entity.ActionRecord;
import com.waiterxiaoyy.entity.AssetType;
import com.waiterxiaoyy.mapper.ActionRecordMapper;
import com.waiterxiaoyy.mapper.AssetTypeMapper;
import com.waiterxiaoyy.service.AssetTypeService;
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



    public List<AssetType> getAll() {
        return assetTypeMapper.getALL();
    }


    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
