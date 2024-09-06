package com.fixedasset.mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.RepairRecordListDto;
import com.fixedasset.entity.RepairRecord;

public interface RepairRecordMapper extends BaseMapper<RepairRecord> {
    
    String ListQuerySQL = "SELECT rr.status as status, rr.id id, al.asset_code as assetCode, al.asset_name as assetName, rr.repair_reason as repairReason, " +
    "rr.maintenance_date as maintenanceDate, rr.repair_amount as repairAmount, rr.created as created, rr.updated as updated " +
    "from repair_record rr left join asset_list al on rr.asset_id = al.id";

    String wrapperSql = "SELECT * from ( " + ListQuerySQL + " ) AS q ${ew.customSqlSegment}";
    String getOneSQL = "SELECT al.asset_code assetCode, al.asset_name assetName, rr.*" +
                "from repair_record rr left join asset_list al on rr.asset_id = al.id where rr.id = #{repairId}";

    @Select(wrapperSql)
    Page<RepairRecordListDto> pageNew(Page page, @Param("ew") Wrapper queryWrapper);

    @Select(getOneSQL)
    RepairRecordListDto getRecordById(@Param("repairId") Long repairId);
    
}
