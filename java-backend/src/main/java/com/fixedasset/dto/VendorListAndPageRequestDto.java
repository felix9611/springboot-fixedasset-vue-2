package com.fixedasset.dto;

import javax.persistence.Transient;

import com.fixedasset.entity.Vendor;

import io.swagger.v3.oas.annotations.media.Schema;

public class VendorListAndPageRequestDto extends Vendor {
    @Schema(description = "Name")
    @Transient private String name;

    @Schema(description = "Find by Address")
    @Transient private String place;

    @Schema(description = "Find by contact")
    @Transient private String contact;

    @Schema(description = "Only apply for paging in list api")
    @Transient private int page;

    @Schema(description = "Only apply for paging in list api")
    @Transient private int limit;
}
