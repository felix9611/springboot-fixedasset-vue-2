package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

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
    private String buyDate;

    @TableField("description")
    private String description;

    @TableField("sponsor")
    private int sponsor;

    @TableField("sponsor_name")
    private String sponsorName;

    @TableField("cost")
    private double cost;

    @TableField("serial_number")
    private String serialNum;

    @TableField("invoice_no")
    private String invoiceNo;

    @TableField("invoice_date")
    private String invoiceDate;

    @TableField("invoice_remark")
    private String invoiceRemark;

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
    private Double taxRate;

    @TableField("include_tax")
    private Boolean includeTax;

    @TableField("after_before_tax")
    private double afterBeforeTax;

    @TableField("account_code")
    private String accountCode;

    @TableField("account_name")
    private String accountName;

    @TableField("brand_code")
    private String brandCode;

    @TableField("brand_name")
    private String brandName;

    @TableField("cheque_no")
    private String chequeNo;

    @TableField("maintenance_period_start")
    private String maintenancePeriodStart;

    @TableField("maintenance_period_end")
    private String maintenancePeriodEnd;

    @TableField("voucher_no")
    private String voucherNo;

    @TableField("Voucher_used_date")
    private String voucherUsedDate;

    @TableField(exist = false)
    private int page;

    @TableField(exist = false)
    private int limit;

    @TableField(exist = false)
    private String buyDateTo;

    @TableField(exist = false)
    private String buyDateFrom;

    @TableField(exist = false)
    private List<AssetListFile> assetListFiles;

    @TableField(exist = false)
    private List<AssetListFile> newAssetListFiles;

}
