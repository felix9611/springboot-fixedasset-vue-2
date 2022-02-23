package com.waiterxiaoyy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.waiterxiaoyy.entity.ActionRecord;
import com.waiterxiaoyy.entity.AssetList;
import com.waiterxiaoyy.entity.AssetListFile;
import com.waiterxiaoyy.mapper.ActionRecordMapper;
import com.waiterxiaoyy.mapper.AssetListFileMapper;
import com.waiterxiaoyy.service.ActionRecordService;
import com.waiterxiaoyy.service.AssetListFileService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.annotation.Resources;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssetListFileServiceImpl extends ServiceImpl<AssetListFileMapper, AssetListFile> implements AssetListFileService {

    @Resource private  AssetListFileMapper assetListFileMapper;

    @Resource private AssetListFile assetListFile;

    @Resource private ActionRecordMapper  actionRecordMapper;

    @Resource private  ActionRecord actionRecord;

    public void saveListPicture(AssetListFile assetListFile){

        assetListFile.setStatu(1);
        assetListFile.setCreated(LocalDateTime.now());
        assetListFileMapper.insert(assetListFile);

        actionRecord.setActionName("Add");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Asset List - Photo");
        actionRecord.setActionData("Any Data");
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public List<AssetListFile> getByAssetId(AssetListFile assetListFile) {
        LambdaQueryWrapper<AssetListFile> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetListFile::getStatu, 1);
        queryWrapper.eq(AssetListFile::getAssetId, assetListFile.getAssetId());
        return assetListFileMapper.selectList(queryWrapper);
    }

    public void removeFile(Long id) {
        assetListFile.setId(id);
        assetListFile.setStatu(0);
        assetListFileMapper.updateById(assetListFile);

        actionRecord.setActionName("REMOVE");
        actionRecord.setActionMethod("DELETE");
        actionRecord.setActionFrom("Asset List - Photo");
        actionRecord.setActionData("Any Data");
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }

}
