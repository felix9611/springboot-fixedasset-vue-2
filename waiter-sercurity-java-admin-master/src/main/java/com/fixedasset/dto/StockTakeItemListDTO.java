package com.fixedasset.dto;

import com.fixedasset.entity.StockTakeItem;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = true)
@Data
public class StockTakeItemListDTO extends StockTakeItem {

    @Transient private String assetCode;

    @Transient private String assetName;

    @Transient private String placeName;

    @Transient private String placeCode;
}
