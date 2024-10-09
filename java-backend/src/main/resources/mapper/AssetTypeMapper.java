package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fixedasset.entity.AssetType;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AssetTypeMapper extends BaseMapper<AssetType> {
    @Select("Select * from asset_type where statu = 1")
    List<AssetType> getALL();
}
