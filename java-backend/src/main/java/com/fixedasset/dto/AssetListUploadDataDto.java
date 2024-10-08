package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class AssetListUploadDataDto {
    @Transient private String assetCode;

    @Transient private String assetName;

    @Transient private String typeCode;

    @Transient private String typeName;

    @Transient private String unit;

    @Transient private String buyDate;

    @Transient private String description;

    @Transient private String sponsor;

    @Transient private String sponsorName;

    @Transient private Double cost;

    @Transient private String serialNum;

    @Transient private String invoiceNo;

    @Transient private String invoiceDate;

    @Transient private String invoiceRemark;

    @Transient private String deptCode;

    @Transient private String deptName;

    @Transient private String placeCode;

    @Transient private String placeName;

    @Transient private String vendorCode;

    @Transient private String vendorName;

    @Transient private String vendorOtherName;

    @Transient private String vendorType;

    @Transient private String vendorEmail;

    @Transient private String vendorPhone;

    @Transient private String vendorFax;

    @Transient private String vendorAddress;

    @Transient private String vendorContactPerson;

    @Transient private String vendorRemark;

    @Transient private String taxCountryCode;

    @Transient private String taxCode;

    @Transient private double taxRate;

    @Transient private String includeTax;

    @Transient private double afterBeforeTax;

    @Transient private String accountCode;

    @Transient private String accountName;

    @Transient private String brandCode;

    @Transient private String brandName;

    @Transient private String chequeNo;

    @Transient private String maintenancePeriodStart;

    @Transient private String maintenancePeriodEnd;

    @Transient private String voucherNo;

    @Transient private String voucherUsedDate;

    @Transient private String remark;
}
