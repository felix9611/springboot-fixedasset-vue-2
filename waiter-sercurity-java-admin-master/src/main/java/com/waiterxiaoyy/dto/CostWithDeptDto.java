package com.waiterxiaoyy.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class CostWithDeptDto {
    @Transient private String deptName;
    @Transient private int totalCost;
}
