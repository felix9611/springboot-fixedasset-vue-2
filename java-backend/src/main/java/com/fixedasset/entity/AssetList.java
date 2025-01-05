package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Data
@TableName("asset_list")
public class AssetList extends BaseEntity {
    @Schema(description = "Asset Code")
    @TableField("asset_code")
    private String assetCode;

    @Schema(description = "Asset Name")
    @TableField("asset_name")
    private String assetName;

    @Schema(description = "Asset Type ID")
    @TableField("type_id")
    private int typeId;

    @Schema(description = "Unit")
    @TableField("unit")
    private String unit;

    @Schema(description = "Buy Date")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @TableField("buy_date")
    private LocalDateTime buyDate;

    @Schema(description = "Description")
    @TableField("description")
    private String description;

    @Schema(description = "1 = With sponsor, 0 = Without sponsor")
    @TableField("sponsor")
    private int sponsor;

    @Schema(description = "Sponsor name")
    @TableField("sponsor_name")
    private String sponsorName;

    @Schema(description = "Cost")
    @TableField("cost")
    private double cost;

    @Schema(description = "Item Serial No.")
    @TableField("serial_number")
    private String serialNum;

    @Schema(description = "Invoice No.")
    @TableField("invoice_no")
    private String invoiceNo;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "Invoice Date")
    @TableField("invoice_date")
    private LocalDateTime invoiceDate;

    @Schema(description = "Invoice Remark")
    @TableField("invoice_remark")
    private String invoiceRemark;

    @Schema(description = "Location Data Id")
    @TableField("place_id")
    private int placeId;

    @Schema(description = "Department Data Id")
    @TableField("dept_id")
    private int deptId;

    @Schema(description = "Staff Id")
    @TableField("staff_id")
    private String staffId;

    @Schema(description = "Vendor Id")
    @TableField("vendor_id")
    private int vendorId;

    @Schema(description = "Remark")
    @TableField("remark")
    private String remark;

    @Schema(description = "Tax Country Code")
    @TableField("tax_country_code")
    private String taxCountryCode;

    @Schema(description = "Tax Code")
    @TableField("tax_code")
    private String taxCode;

    @Schema(description = "Tax Rate")
    @TableField("tax_rate")
    private Double taxRate;

    @Schema(description = "1 = Cost plus tax, 0 = Cost without tax")
    @TableField("include_tax")
    private Boolean includeTax;

    @Schema(description = "After or before tax")
    @TableField("after_before_tax")
    private double afterBeforeTax;

    @Schema(description = "Account Code")
    @TableField("account_code")
    private String accountCode;

    @Schema(description = "Account Name")
    @TableField("account_name")
    private String accountName;

    @Schema(description = "Brand Code")
    @TableField("brand_code")
    private String brandCode;

    @Schema(description = "Brand Name")
    @TableField("brand_name")
    private String brandName;

    @Schema(description = "Cheque No.")
    @TableField("cheque_no")
    private String chequeNo;

    @Schema(description = "Maintenance Period Range Start")
    @TableField("maintenance_period_start")
    private String maintenancePeriodStart;

    @Schema(description = "Maintenance Period Range End")
    @TableField("maintenance_period_end")
    private String maintenancePeriodEnd;

    @Schema(description = "Voucher no.")
    @TableField("voucher_no")
    private String voucherNo;

    @Schema(description = "Voucher Used Date")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @TableField("Voucher_used_date")
    private LocalDateTime voucherUsedDate;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit;

    @Schema(description = "Only apply for paging in list api, Buy Date Range To")
    @TableField(exist = false)
    private String buyDateTo;

    @Schema(description = "Only apply for paging in list api, Buy Date Range From")
    @TableField(exist = false)
    private String buyDateFrom;

    @Schema(description = "Only apply for response, files list")
    @TableField(exist = false)
    private List<AssetListFile> assetListFiles;

    @Schema(description = "Only apply for request, files list for add")
    @TableField(exist = false)
    private List<AssetListFile> newAssetListFiles;

}
