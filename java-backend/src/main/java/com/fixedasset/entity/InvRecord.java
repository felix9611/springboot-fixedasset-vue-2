package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@TableName("invrecord")
@Component
public class InvRecord extends BaseEntity{

    @Schema(description = "The aaset code")
    @TableField("asset_code")
    private String assetCode;

    @Schema(description = "From of the location id")
    @TableField("place_from")
    private int placeFrom;

    @Schema(description = "To of the location id")
    @TableField("place_to")
    private int placeTo;

    @Schema(description = "Staff Id")
    @TableField("staff_id")
    private int staffId;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page = 1;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit = 10;
}
