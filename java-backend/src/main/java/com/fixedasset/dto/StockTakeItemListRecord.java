package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

import org.springframework.stereotype.Component;

import io.swagger.v3.oas.annotations.media.Schema;
@Component
@EqualsAndHashCode(callSuper = false)
@Data
public class StockTakeItemListRecord {
    @Schema(description = "The asset code")
    @Transient private String assetCode;

    @Schema(description = "The location name")
    @Transient private String placeName;

    @Schema(description = "The location code")
    @Transient private String placeCode;

    @Schema(description = "Remark for item stock take")
    @Transient private String remark;
}
