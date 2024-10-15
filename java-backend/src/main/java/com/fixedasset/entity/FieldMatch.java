package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("field_match")
public class FieldMatch extends BaseEntity{
    @Schema(description = "Function Category Code")
    @TableField("function_category_code")
    private String functionCategoryCode;

    @Schema(description = "Function Category")
    @TableField("function_category")
    private String functionCategory;

    @Schema(description = "Data Type")
    @TableField("type")
    private String type;

    @Schema(description = "Datebase Table Name")
    @TableField("db_table")
    private String dbTable;

    @Schema(description = "Field Code Name")
    @TableField("field_code_name")
    private String fieldCodeName;

    @Schema(description = "Field Name")
    @TableField("field_name")
    private String fieldName;

    @Schema(description = "Excel Column Defind")
    @TableField("excel_defind")
    private String excelDefind;
}
