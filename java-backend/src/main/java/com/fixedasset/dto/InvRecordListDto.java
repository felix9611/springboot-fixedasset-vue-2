package com.fixedasset.dto;

import com.fixedasset.entity.InvRecord;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@EqualsAndHashCode(callSuper = false)
@Data
public class InvRecordListDto extends InvRecord {

    @Transient private String fromPlaceName;
    @Transient private String fromPlaceCode;
    @Transient private String toPlaceName;
    @Transient private String toPlaceCode;
}
