package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fixedasset.entity.Vendor;

import java.util.List;

public interface VendorMapper extends BaseMapper<Vendor> {
    // @Select("Select * from vendor where statu = 1")
    List<Vendor> getALL();
}
