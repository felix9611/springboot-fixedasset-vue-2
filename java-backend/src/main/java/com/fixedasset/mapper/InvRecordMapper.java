package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.InvRecordListDto;
import com.fixedasset.entity.InvRecord;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface InvRecordMapper extends BaseMapper<InvRecord> {

    Page<InvRecordListDto> pageAndList(Page page, @Param("ew") Wrapper queryWrapper);
}
