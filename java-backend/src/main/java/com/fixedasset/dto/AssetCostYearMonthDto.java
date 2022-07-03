package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class AssetCostYearMonthDto{
    @Transient private String yearMonth;

    @Transient private int costs;
}
