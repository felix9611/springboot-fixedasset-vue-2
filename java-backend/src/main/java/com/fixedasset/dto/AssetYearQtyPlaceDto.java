package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class AssetYearQtyPlaceDto {
    @Transient private String yearMonth;
    @Transient private String placeName;
    @Transient private int items;
    @Transient private int costs;
}
