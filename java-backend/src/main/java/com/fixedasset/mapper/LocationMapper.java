package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fixedasset.entity.Location;
import org.apache.ibatis.annotations.Select;

import java.sql.Array;
import java.util.List;

public interface LocationMapper extends BaseMapper<Location> {

    @Select("Select * from location where statu = 1")
    List<Location> getALL();
}
