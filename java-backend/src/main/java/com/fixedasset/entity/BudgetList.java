package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Data
@TableName("budget_list")
public class BudgetList extends BaseEntity{
    @TableField("budget_month")
    private int budgetMonth;

    @TableField("place_code")
    private String budgetName;

    @TableField("budget_amount")
    private int budgetAmount;

    @TableField("budget_from")
    private LocalDateTime budgetFrom;

    @TableField("budget_to")
    private LocalDateTime budgetTo;

    @TableField("budget_status")
    private String budgetStatus;
}
