package com.waiterxiaoyy.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.waiterxiaoyy.entity.CodeType;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CodeTypeMapper extends BaseMapper<CodeType> {
    @Select("Select * from code_type where type=#{typeCode} AND statu = 1")
    List<CodeType> getALL(@Param("typeCode") String typeCode);
}
