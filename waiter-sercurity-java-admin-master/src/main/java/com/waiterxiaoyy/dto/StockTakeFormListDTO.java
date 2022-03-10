package com.waiterxiaoyy.dto;

import com.waiterxiaoyy.entity.StockTake;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = true)
@Data
public class StockTakeFormListDTO extends StockTake {
    @Transient private String placeName;

    @Transient private String placeCode;

    @Transient private String createdAt;
}
