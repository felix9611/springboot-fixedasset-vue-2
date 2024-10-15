package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Transient;

import io.swagger.v3.oas.annotations.media.Schema;

@EqualsAndHashCode(callSuper = false)
@Data
public class TaxInformationUploadData {

    @Schema(description = "Nation Code")
    @Transient private String nationCode;

    @Schema(description = "Nation Name")
    @Transient private String nationName;

    @Schema(description = "Country Code")
    @Transient private String countryCode;

    @Schema(description = "Country Name")
    @Transient private String countryName;

    @Schema(description = "Tax Type")
    @Transient private String taxType;

    @Schema(description = "Tax Code")
    @Transient private String taxCode;

    @Schema(description = "Tax Name")
    @Transient private String taxName;

    @Schema(description = "Tax Rate")
    @Transient private double taxRate;

    @Schema(description = "Import Tax Rate")
    @Transient private double importRate;
}
