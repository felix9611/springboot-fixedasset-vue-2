package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import javax.persistence.Transient;

import io.swagger.v3.oas.annotations.media.Schema;

@EqualsAndHashCode(callSuper = false)
@Data
public class AssetListUploadDataDto {
    @Schema(description = "Asset Code")
    @Transient private String assetCode;

    @Schema(description = "Asset Name")
    @Transient private String assetName;

    @Schema(description = "Asset Type Code")
    @Transient private String typeCode;

    @Schema(description = "Asset Type Name")
    @Transient private String typeName;

    @Schema(description = "Unit")
    @Transient private String unit;

    @Schema(description = "Buy Date")
    @Transient private String buyDate;

    @Schema(description = "Description")
    @Transient private String description;

    @Schema(description = "Yes or No")
    @Transient private String sponsor;

    @Schema(description = "Sponsor name")
    @Transient private String sponsorName;

    @Schema(description = "Cost")
    @Transient private Double cost;

    @Schema(description = "Item Serial No.")
    @Transient private String serialNum;

    @Schema(description = "Invoice No.")
    @Transient private String invoiceNo;

    @Schema(description = "Invoice Date")
    @Transient private String invoiceDate;

    @Schema(description = "Invoice Remark")
    @Transient private String invoiceRemark;

    @Schema(description = "Department Code")
    @Transient private String deptCode;

    @Schema(description = "Department Name")
    @Transient private String deptName;

    @Schema(description = "Location Code")
    @Transient private String placeCode;

    @Schema(description = "Location Name")
    @Transient private String placeName;

    @Schema(description = "Vendor Code")
    @Transient private String vendorCode;

    @Schema(description = "Vendor Name")
    @Transient private String vendorName;

    @Schema(description = "Vendor Other Name")
    @Transient private String vendorOtherName;

    @Schema(description = "Vendor Type")
    @Transient private String vendorType;

    @Schema(description = "Vendor Email")
    @Transient private String vendorEmail;

    @Schema(description = "Vendor Phone")
    @Transient private String vendorPhone;

    @Schema(description = "Vendor Fax")
    @Transient private String vendorFax;

    @Schema(description = "Vendor Address")
    @Transient private String vendorAddress;

    @Schema(description = "Vendor Contact Person Name")
    @Transient private String vendorContactPerson;

    @Schema(description = "Vendor Remark")
    @Transient private String vendorRemark;

    @Schema(description = "Tax Country Code")
    @Transient private String taxCountryCode;

    @Schema(description = "Tax Code")
    @Transient private String taxCode;

    @Schema(description = "Tax Rate")
    @Transient private double taxRate;

    @Schema(description = "Yes or No")
    @Transient private String includeTax;

    @Schema(description = "After or before tax")
    @Transient private double afterBeforeTax;

    @Schema(description = "Account Code")
    @Transient private String accountCode;

    @Schema(description = "Account Name")
    @Transient private String accountName;

    @Schema(description = "Brand Code")
    @Transient private String brandCode;

    @Schema(description = "Brand Name")
    @Transient private String brandName;

    @Schema(description = "Cheque No.")
    @Transient private String chequeNo;

    @Schema(description = "Maintenance Period Range Start")
    @Transient private String maintenancePeriodStart;

    @Schema(description = "Maintenance Period Range End")
    @Transient private String maintenancePeriodEnd;

    @Schema(description = "Voucher no.")
    @Transient private String voucherNo;

    @Schema(description = "Voucher Used Date")
    @Transient private String voucherUsedDate;

    @Schema(description = "Remark")
    @Transient private String remark;
}
