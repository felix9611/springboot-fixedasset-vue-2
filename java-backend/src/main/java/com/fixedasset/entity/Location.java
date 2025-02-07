package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@TableName("location")
public class Location extends BaseEntity {
    @Schema(description = "The place code")
    @TableField("place_code")
    private String placeCode;

    @Schema(description = "The place name")
    @TableField("place_name")
    private String placeName;

    @Schema(description = "Flex data, only for string from json format data")
    @TableField("flexData")
    private String flexData;

    @Schema(description = "The remark")
    @TableField("remark")
    private String remark;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page = 1;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit = 10;

    @Schema(description = "Find by Name or code")
    @TableField(exist = false)
    private String name;

}
