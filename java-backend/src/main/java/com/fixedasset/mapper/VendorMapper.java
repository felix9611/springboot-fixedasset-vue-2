package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fixedasset.entity.Vendor;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface VendorMapper extends BaseMapper<Vendor> {
    @Select("Select * from vendor where statu = 1")
    List<Vendor> getALL();
}
