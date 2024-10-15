package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@TableName("department")
public class Department extends BaseEntity {

    @Schema(description = "The department code")
    @TableField("dept_code")
    private String deptCode;

    @Schema(description = "The department name")
    @TableField("dept_name")
    private String deptName;

    @Schema(description = "The department other name")
    @TableField("dept_other_name")
    // @Type(type = "json")
    private String deptOtherName;

    @Schema(description = "The remark")
    @TableField("dept_remark")
    private String deptRemark;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page = 1;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit = 10;

}
