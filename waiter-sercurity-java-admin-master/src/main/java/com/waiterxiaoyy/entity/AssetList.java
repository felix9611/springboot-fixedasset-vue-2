package com.waiterxiaoyy.entity;

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
    private String typeId;

    @TableField("unit")
    private String unit;

    @TableField("buy_date")
    private LocalDateTime buyDate;

    @TableField("description")
    private String description;

    @TableField("cost")
    private String cost;

    @TableField("serial_number")
    private String serialNum;

    @TableField("invoice_no")
    private String invoiceNo;

    @TableField("invoice_date")
    private LocalDateTime invoiceDate;

    @TableField("place_id")
    private String placeId;

    @TableField("dept_id")
    private String deptId;

    @TableField("staff_id")
    private String staffId;

    @TableField("remark")
    private String remark;

    @TableField(exist = false)
    private int page;

    @TableField(exist = false)
    private int limit;

}
