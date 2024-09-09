package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.dto.RepairRecordListDto;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.RepairRecord;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.RepairRecordMapper;
import com.fixedasset.service.RepairRecordService;
import java.time.LocalDateTime;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

@Service
public class RepairRecordServiceImpl extends ServiceImpl<RepairRecordMapper, RepairRecord> implements RepairRecordService {
    @Resource private RepairRecord repairRecord;
    @Resource private ActionRecord actionRecord;
    @Resource private ActionRecordMapper actionRecordMapper;
    @Resource private RepairRecordMapper repairRecordMapper;

    /*
     public Page<AssetListViewDTO> newPage(Page page, LambdaQueryWrapper<AssetList> queryWrapper){
        return this.assetListMapper.page(page, queryWrapper);
    }
     */

     public Page<RepairRecordListDto> newPage(Page page, LambdaQueryWrapper<RepairRecordListDto> queryWrapper) {
        return repairRecordMapper.pageNew(page, queryWrapper);
     }



    public void createNew(RepairRecord repairRecord) {
        repairRecord.setCreated(LocalDateTime.now());
        repairRecord.setStatus(1);

        repairRecordMapper.insert(repairRecord);

        actionRecord.setActionName("Create");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Rapir Record");
        actionRecord.setActionData(repairRecord.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

   

    public void update(RepairRecord repairRecord) {
        repairRecord.setUpdated(LocalDateTime.now());

        repairRecordMapper.updateById(repairRecord);

        actionRecord.setActionName("Update");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Rapir Record");
        actionRecord.setActionData(repairRecord.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    public RepairRecord findOneById(Long id) {
        return repairRecordMapper.getRecordById(id);
    }

    public void voidRecord(Long id) {
        repairRecord.setId(id);
        repairRecord.setStatus(0);
        repairRecord.setUpdated(LocalDateTime.now());
        repairRecordMapper.updateById(repairRecord);
        

        actionRecord.setActionName("Void");
        actionRecord.setActionMethod("DELETE");
        actionRecord.setActionFrom("Rapir Record");
        actionRecord.setActionData(repairRecord.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);
    }

    private int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }

}
