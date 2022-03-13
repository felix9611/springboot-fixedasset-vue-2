package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@TableName("vendor")
@Component
public class Vendor extends BaseEntity {

    @TableField("vendor_code")
    private String vendorCode;

    @TableField("vendor_name")
    private String vendorName;

    @TableField("vendor_other_name")
    private String vendorOtherName;

    @TableField("remark")
    private String remark;

    @TableField(exist = false)
    private int page;

    @TableField(exist = false)
    private int limit;
}
