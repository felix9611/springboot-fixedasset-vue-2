package com.fixedasset.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class GroupByAssetOfTypeDto {
    @Transient private String typeName;

    @Transient private int items;
}
