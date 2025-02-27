package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Data
@TableName("budget_list")
public class BudgetList extends BaseEntity {
    @Schema(description = "Department Id")
    @TableField("dept_id")
    private int deptId;

    @Schema(description = "Location Id")
    @TableField("place_id")
    private int placeId;

    @Schema(description = "Budget No.")
    @TableField("budget_no")
    private String budgetNo;

    @Schema(description = "Budget Name")
    @TableField("budget_name")
    private String budgetName;

    @Schema(description = "Budget of year")
    private int year;

    @Schema(description = "Budget of month")
    private int month;

    @Schema(description = "Budget Amount")
    @TableField("budget_amount")
    private int budgetAmount;

    @Schema(description = "Budget Date Range From ")
    @TableField("budget_from")
    // @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime budgetFrom;

    @Schema(description = "Budget Date Range To ")
    @TableField("budget_to")
    // @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime budgetTo;

    @Schema(description = "Budget Status")
    @TableField("budget_status")
    private String budgetStatus;

    @Schema(description = "The remark")
    @TableField("remark")
    private String remark;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page = 1;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit = 10;
}
