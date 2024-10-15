package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("code_type")
public class CodeType extends BaseEntity {
    @Schema(description = "The categroy type")
    @TableField("type")
    private String type;

    @Schema(description = "The value code")
    @TableField("value_code")
    private String valueCode;

    @Schema(description = "The value name")
    @TableField("value_name")
    private String valueName;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page = 1;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit = 10;
}
