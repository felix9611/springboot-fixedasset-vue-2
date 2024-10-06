package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class TaxInformationUploadData {

    @Transient private String nationCode;

    @Transient private String nationName;

    @Transient private String countryCode;

    @Transient private String countryName;

    @Transient private String taxType;

    @Transient private String taxCode;

    @Transient private String taxName;

    @Transient private double taxRate;

    @Transient private double importRate;
}
