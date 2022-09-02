package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("location")
public class Location extends BaseEntity {
    @TableField("place_code")
    private String placeCode;

    @TableField("place_name")
    private String placeName;

    @TableField("flexData")
    private String flexData;

    @TableField("remark")
    private String remark;

    @TableField(exist = false)
    private int page = 1;

    @TableField(exist = false)
    private int limit = 10;
}
