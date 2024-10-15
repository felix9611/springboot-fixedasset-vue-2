package com.fixedasset.requestBody;

import javax.persistence.Transient;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = false)
@Data
public class ActionRecordBody {
    @Transient private int page;
    @Transient private int limit;
}
