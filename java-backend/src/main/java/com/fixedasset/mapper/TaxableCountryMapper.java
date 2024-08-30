package com.fixedasset.mapper;

import com.fixedasset.entity.AssetType;
import com.fixedasset.entity.TaxableCountry;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface TaxableCountryMapper extends BaseMapper<TaxableCountry>{
    @Select("Select * from taxable_country where status = 1")
    List<TaxableCountry> getALL();
}
