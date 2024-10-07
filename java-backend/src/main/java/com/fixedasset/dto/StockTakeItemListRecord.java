package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

import org.springframework.stereotype.Component;
@Component
@EqualsAndHashCode(callSuper = false)
@Data
public class StockTakeItemListRecord {

    @Transient private String assetCode;

    @Transient private String placeName;

    @Transient private String placeCode;

    @Transient private String remark;
}
