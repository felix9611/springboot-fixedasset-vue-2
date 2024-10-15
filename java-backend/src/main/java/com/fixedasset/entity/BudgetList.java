package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Data
@TableName("budget_list")
public class BudgetList extends BaseEntity{
    @Schema(description = "Month budget")
    @TableField("budget_month")
    private int budgetMonth;

    @Schema(description = "Location Name")
    @TableField("place_code")
    private String budgetName;

    @Schema(description = "Budget Amount")
    @TableField("budget_amount")
    private int budgetAmount;

    @Schema(description = "Budget Date Range From ")
    @TableField("budget_from")
    private LocalDateTime budgetFrom;

    @Schema(description = "Budget Date Range To ")
    @TableField("budget_to")
    private LocalDateTime budgetTo;

    @Schema(description = "Budget Status")
    @TableField("budget_status")
    private String budgetStatus;
}
