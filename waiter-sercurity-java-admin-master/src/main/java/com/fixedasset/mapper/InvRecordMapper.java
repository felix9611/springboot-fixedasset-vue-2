package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.InvRecordListDto;
import com.fixedasset.entity.InvRecord;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface InvRecordMapper extends BaseMapper<InvRecord> {

    String querySQL = "SELECT ir.*, \n" +
            "lf.place_name as fromPlaceName, lt.place_name as toPlaceName,\n" +
            "lf.place_code as fromPlaceCode, lt.place_code as toPlaceCode \n" +
            "FROM invrecord as ir\n" +
            "left join location as lf ON ir.place_from = lf.id\n" +
            "left join location as lt ON ir.place_to = lt.id";

    @Select("SELECT * from (" + querySQL + " ) AS q ${ew.customSqlSegment}")
    Page<InvRecordListDto> page(Page page, @Param("ew") Wrapper queryWrapper);
}
