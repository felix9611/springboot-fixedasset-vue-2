package com.fixedasset.dto;

import javax.persistence.Transient;

import com.fixedasset.entity.BudgetList;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class BudgetListDto extends BudgetList {
    @Transient private String deptName;

    @Transient private String deptCode;

    @Transient private String placeName;

    @Transient private String placeCode;

    @Transient private String yearMonth;
}
