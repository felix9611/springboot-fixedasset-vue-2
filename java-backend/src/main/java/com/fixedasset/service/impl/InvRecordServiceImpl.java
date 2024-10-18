package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.dto.FindInvRecordDto;
import com.fixedasset.dto.InvRecordListDto;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.AssetList;
import com.fixedasset.entity.InvRecord;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.AssetListMapper;
import com.fixedasset.mapper.InvRecordMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.InvRecordService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@Service
public class InvRecordServiceImpl extends ServiceImpl<InvRecordMapper, InvRecord> implements InvRecordService {

    @Resource InvRecord invRecord;

    @Resource AssetListMapper assetListMapper;

    @Resource InvRecordMapper invRecordMapper;

    @Resource private ActionRecordService actionRecordService;

    public Page<InvRecordListDto> newPage(Page page, LambdaQueryWrapper<FindInvRecordDto> queryWrapper) {
        return invRecordMapper.pageAndList(page, queryWrapper);
    }

    public void saveRecord(int assetId, int newPlaceId) {

        AssetList oldAssetRecord = assetListMapper.selectById(assetId);

        if(newPlaceId != oldAssetRecord.getPlaceId()){
            invRecord.setAssetCode(oldAssetRecord.getAssetCode());
            invRecord.setPlaceFrom(oldAssetRecord.getPlaceId());
            invRecord.setPlaceTo(newPlaceId);
            invRecord.setStatu(1);
            invRecord.setCreated(LocalDateTime.now());

            invRecordMapper.insert(invRecord);

            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "InvRecord Manger - change Place", 
                invRecord.toString(), 
                "Success"
            );
        }
    }

    public void saveNewRecord(String assetCode, int placeId) {

        invRecord.setAssetCode(assetCode);
        invRecord.setPlaceFrom(0);
        invRecord.setPlaceTo(placeId);
        invRecord.setStatu(1);
        invRecord.setCreated(LocalDateTime.now());

        invRecordMapper.insert(invRecord);

        actionRecordService.createdAction(
            "Save", 
            "POST", 
            "InvRecord Manger - store new place", 
            invRecord.toString(), 
            "Success"
        );

    }

    public void writeOff(String assetCode, int placeId) {

        invRecord.setAssetCode(assetCode);
        invRecord.setPlaceFrom(placeId);
        invRecord.setPlaceTo(0);
        invRecord.setStatu(0);
        invRecord.setCreated(LocalDateTime.now());

        invRecordMapper.insert(invRecord);

        actionRecordService.createdAction(
            "Save", 
            "POST", 
            "InvRecord Manger - write off", 
            invRecord.toString(), 
            "Success"
        );
    }
}
