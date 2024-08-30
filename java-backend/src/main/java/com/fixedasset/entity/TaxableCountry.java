package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("taxable_country")
public class TaxableCountry extends BaseEntity{
    @TableField("nation_code")
    private String nationCode;

    @TableField("nation_name")
    private String nationName;

    @TableField("country_code")
    private String countryCode;

    @TableField("country_name")
    private String countryName;

    @TableField("tax_type")
    private String taxType;

    @TableField("tax_code")
    private String taxCode;

    @TableField("tax_name")
    private String taxName;

    @TableField("tax_rate")
    private String taxRate;

    @TableField("import_tax")
    private int importRate;

    @TableField(exist = false)
    private int page;

    @TableField(exist = false)
    private int limit;
}
