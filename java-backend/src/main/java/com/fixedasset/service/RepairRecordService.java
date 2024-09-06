package com.fixedasset.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.common.lang.Result;
import com.fixedasset.dto.RepairRecordListDto;
import com.fixedasset.entity.RepairRecord;

public interface RepairRecordService extends IService<RepairRecord>{
    void createNew(RepairRecord repairRecord);

    void update(RepairRecord repairRecord);

    RepairRecord findOneById(Long id);

    void voidRecord(Long id);

    Page<RepairRecordListDto> newPage(Page page, LambdaQueryWrapper<RepairRecordListDto> queryWrapper);
}
