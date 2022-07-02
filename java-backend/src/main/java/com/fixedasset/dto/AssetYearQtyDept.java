package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class AssetYearQtyDept {
    @Transient private String yearMonth;

    @Transient private int items;

    @Transient private String deptName;
}
