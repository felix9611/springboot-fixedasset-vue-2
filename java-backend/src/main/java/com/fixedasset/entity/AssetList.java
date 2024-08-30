package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Data
@TableName("asset_list")
public class AssetList extends BaseEntity{
    @TableField("asset_code")
    private String assetCode;

    @TableField("asset_name")
    private String assetName;

    @TableField("type_id")
    private int typeId;

    @TableField("unit")
    private String unit;

    @TableField("buy_date")
    private LocalDateTime buyDate;

    @TableField("description")
    private String description;

    @TableField("sponsor")
    private int sponsor;

    @TableField("sponsor_name")
    private String sponsorName;

    @TableField("cost")
    private String cost;

    @TableField("serial_number")
    private String serialNum;

    @TableField("invoice_no")
    private String invoiceNo;

    @TableField("invoice_date")
    private LocalDateTime invoiceDate;

    @TableField("place_id")
    private int placeId;

    @TableField("dept_id")
    private int deptId;

    @TableField("staff_id")
    private String staffId;

    @TableField("vendor_id")
    private int vendorId;

    @TableField("remark")
    private String remark;

    @TableField("tax_country_code")
    private String taxCountryCode;

    @TableField("tax_code")
    private String taxCode;

    @TableField("tax_rate")
    private int taxRate;

    @TableField("include_tax")
    private Boolean includeTax;

    @TableField("after_before_tax")
    private String afterBeforeTax;

    @TableField(exist = false)
    private int page;

    @TableField(exist = false)
    private int limit;

    @TableField(exist = false)
    private LocalDateTime buyDateTo;

    @TableField(exist = false)
    private LocalDateTime buyDateFrom;

}
