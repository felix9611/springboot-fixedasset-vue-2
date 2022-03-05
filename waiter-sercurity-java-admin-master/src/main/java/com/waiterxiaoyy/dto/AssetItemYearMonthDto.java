package com.waiterxiaoyy.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class AssetItemYearMonthDto {
    @Transient private String yearMonth;

    @Transient private int items;
}
