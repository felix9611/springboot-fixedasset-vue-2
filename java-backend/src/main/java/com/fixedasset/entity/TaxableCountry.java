package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("taxable_country")
public class TaxableCountry extends BaseEntity{
    @Schema(description = "Nation Code")
    @TableField("nation_code")
    private String nationCode;

    @Schema(description = "Nation Name")
    @TableField("nation_name")
    private String nationName;

    @Schema(description = "Country Code")
    @TableField("country_code")
    private String countryCode;

    @Schema(description = "Country Name")
    @TableField("country_name")
    private String countryName;

    @Schema(description = "Tax Type")
    @TableField("tax_type")
    private String taxType;

    @Schema(description = "Tax Code")
    @TableField("tax_code")
    private String taxCode;

    @Schema(description = "Tax Name")
    @TableField("tax_name")
    private String taxName;

    @Schema(description = "Tax Rate")
    @TableField("tax_rate")
    private double taxRate;

    @Schema(description = "Import Tax Rate")
    @TableField("import_tax")
    private double importRate;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit;

    @Schema(description = "Find by Name or code")
    @TableField(exist = false)
    private String nameCode;

    @Schema(description = "Find by tax")
    @TableField(exist = false)
    private String tax;
}
