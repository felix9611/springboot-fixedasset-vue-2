package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fixedasset.entity.CodeType;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CodeTypeMapper extends BaseMapper<CodeType> {

    List<CodeType> getALL(@Param("typeCode") String typeCode);
}
