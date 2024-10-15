package com.fixedasset.requestBody;

import javax.persistence.Transient;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = false)
@Data
public class ActionRecordBody {
    @Schema(description = "Only apply for paging in list api")
    @Transient private int page;

    @Schema(description = "Only apply for paging in list api")
    @Transient private int limit;
}
