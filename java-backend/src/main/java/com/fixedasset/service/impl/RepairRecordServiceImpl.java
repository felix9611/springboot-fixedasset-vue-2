package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.dto.RepairRecordListDto;
import com.fixedasset.entity.AssetList;
import com.fixedasset.entity.RepairRecord;
import com.fixedasset.mapper.AssetListMapper;
import com.fixedasset.mapper.RepairRecordMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.AssetListService;
import com.fixedasset.service.RepairRecordService;
import java.time.LocalDateTime;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

@Service
public class RepairRecordServiceImpl extends ServiceImpl<RepairRecordMapper, RepairRecord> implements RepairRecordService {

    @Resource private RepairRecord repairRecord;

    @Resource private ActionRecordService actionRecordService;

    @Resource private RepairRecordMapper repairRecordMapper;

    @Resource private AssetListService assetListService;

    @Resource private AssetList assetList;

    @Resource private AssetListMapper assetListMapper;


    /*
     public Page<AssetListViewDTO> newPage(Page page, LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.page(page, queryWrapper);
    }
     */

     public Page<RepairRecordListDto> newPage(Page page, LambdaQueryWrapper<RepairRecordListDto> queryWrapper) {
        return repairRecordMapper.pageNew(page, queryWrapper);
     }

    public void importData(List<RepairRecord> repairRecords) {
        for (RepairRecord repairRecord : repairRecords) {
          //  AssetList assetList = new AssetList();
          //  assetList.setAssetCode(repairRecord.getAssetCode());
          //  AssetList check = assetListService.findOneByAssetCode(assetList);

            LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();
            queryWrapper.eq(AssetList::getAssetCode, repairRecord.getAssetCode());
            queryWrapper.eq(AssetList::getStatu, 1);
            AssetList check = assetListMapper.selectOne(queryWrapper);

            if (check.getAssetCode().equals(repairRecord.getAssetCode())) {
                repairRecord.setAssetId(Math.toIntExact(check.getId()));
                createNew(repairRecord);
            } else {
                throw new RuntimeException("No unknown asset data in records!");
            }
        }
    }

    public void createNew(RepairRecord repairRecord) {
        
        Long assetId = (long) repairRecord.getAssetId();
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(AssetList::getStatu, 1);
        queryWrapper.eq(AssetList::getId, assetId);
        AssetList check = assetListMapper.selectOne(queryWrapper);

        if (check.getId().equals((long) repairRecord.getAssetId())) {
            repairRecord.setCreated(LocalDateTime.now());
            repairRecord.setStatus(1);

            repairRecordMapper.insert(repairRecord);

            actionRecordService.createdAction(
                "Create", 
                "POST", 
                "Rapir Record", 
                repairRecord.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Create", 
                "POST", 
                "Rapir Record", 
                repairRecord.toString(), 
                "Failure"
            );
            throw new RuntimeException("No unknown asset data in records!");
        }
    }

    public void update(RepairRecord repairRecord) {
        LambdaQueryWrapper<RepairRecord> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(RepairRecord::getId, repairRecord.getId());
        queryWrapper.eq(RepairRecord::getStatus, 1);
        RepairRecord checkOne = repairRecordMapper.selectOne(queryWrapper);

        if (checkOne.getId().equals(repairRecord.getId())) {
            repairRecord.setUpdated(LocalDateTime.now());

            repairRecordMapper.updateById(repairRecord);

            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Rapir Record", 
                repairRecord.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Rapir Record", 
                repairRecord.toString(), 
                "Failure"
            );
            throw new RuntimeException("No unknown asset data in records!");
        }
    }

    public RepairRecord findOneById(Long id) {
        return repairRecordMapper.getRecordById(id);
    }

    public void voidRecord(Long id) {
        LambdaQueryWrapper<RepairRecord> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(RepairRecord::getId, id);
        queryWrapper.eq(RepairRecord::getStatus, 1);
        RepairRecord checkOne = repairRecordMapper.selectOne(queryWrapper);

        if (checkOne.getId().equals(id)) {
            repairRecord.setId(id);
            repairRecord.setStatus(0);
            repairRecord.setUpdated(LocalDateTime.now());
            repairRecordMapper.updateById(repairRecord);

            actionRecordService.createdAction(
                "Void", 
                "DELETE", 
                "Rapir Record", 
                repairRecord.toString(), 
                "Success"
            );
            
        } else {
            actionRecordService.createdAction(
                "Void", 
                "DELETE", 
                "Rapir Record", 
                repairRecord.toString(), 
                "Failure"
            );
            throw new RuntimeException("No unknown asset data in records!");
        }
    }

}
