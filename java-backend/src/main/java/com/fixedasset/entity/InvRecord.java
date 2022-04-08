package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@TableName("invrecord")
@Component
public class InvRecord extends BaseEntity{
    @TableField("asset_code")
    private String assetCode;

    @TableField("place_from")
    private int placeFrom;

    @TableField("place_to")
    private int placeTo;

    @TableField("staff_id")
    private int staffId;

    @TableField(exist = false)
    private int page = 1;

    @TableField(exist = false)
    private int limit = 10;
}
