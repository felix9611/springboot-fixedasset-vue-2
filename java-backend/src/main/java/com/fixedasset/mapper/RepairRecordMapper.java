package com.fixedasset.mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.RepairRecordListDto;
import com.fixedasset.entity.RepairRecord;

public interface RepairRecordMapper extends BaseMapper<RepairRecord> {
    
    Page<RepairRecordListDto> pageNew(Page page, @Param("ew") Wrapper queryWrapper);

    RepairRecord getRecordById(@Param("repairId") Long repairId);
    
}
