package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@TableName("vendor")
@Component
public class Vendor extends BaseEntity {

    @Schema(description = "Vendor Code")
    @TableField("vendor_code")
    private String vendorCode;

    @Schema(description = "Vendor Name")
    @TableField("vendor_name")
    private String vendorName;

    @TableField("vendor_other_name")
    private String vendorOtherName;

    @Schema(description = "Type")
    @TableField("type")
    private String type;

    @Schema(description = "Email Address")
    @TableField("email")
    private String email;

    @Schema(description = "Phone Number")
    @TableField("phone")
    private String phone;

    @Schema(description = "Fax Number")
    @TableField("fax")
    private String fax;

    @Schema(description = "Vendor Address")
    @TableField("address")
    private String address;

    @Schema(description = "Contact Person Name/Position")
    @TableField("contact_person")
    private String contactPerson;

    @Schema(description = "Remark")
    @TableField("remark")
    private String remark;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit;

    @Schema(description = "Find by Name or code")
    @TableField(exist = false)
    private String name;

    @Schema(description = "Find by Address")
    @TableField(exist = false)
    private String place;

    @Schema(description = "Find by contact")
    @TableField(exist = false)
    private String contact;
}
