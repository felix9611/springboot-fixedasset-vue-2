package com.fixedasset.requestBody;

import javax.persistence.Transient;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = false)
@Data
public class CreateAssetList {
    @Transient private String typeCode;
    @Transient private String typeName;
    @Transient private String typeOtherName;
    @Transient private String remark;
}
