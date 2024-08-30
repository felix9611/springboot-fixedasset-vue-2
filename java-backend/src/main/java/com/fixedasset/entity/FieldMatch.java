package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("field_match")
public class FieldMatch extends BaseEntity{
    @TableField("function_category_code")
    private String functionCategoryCode;

    @TableField("function_category")
    private String functionCategory;

    @TableField("type")
    private String type;

    @TableField("db_table")
    private String dbTable;

    @TableField("field_code_name")
    private String fieldCodeName;

    @TableField("field_name")
    private String fieldName;

    @TableField("excel_defind")
    private String excelDefind;
}
