package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("asset_type")
public class AssetType extends BaseEntity {
    @Schema(description = "The type code")
    @TableField("type_code")
    private String typeCode;

    @Schema(description = "The type name")
    @TableField("type_name")
    private String typeName;

    @Schema(description = "The type other name")
    @TableField("type_other_name")
    private String typeOtherName;

    @Schema(description = "The remark")
    @TableField("remark")
    private String remark;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit;
}
