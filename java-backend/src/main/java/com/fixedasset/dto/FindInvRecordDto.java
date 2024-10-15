package com.fixedasset.dto;

import com.fixedasset.entity.InvRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = false)
@Data
public class FindInvRecordDto extends InvRecord {
    @Schema(description = "Create date time form")
    private LocalDateTime createdTo;

    @Schema(description = "Create date time to")
    private LocalDateTime createdFrom;

    public LocalDateTime getCreatedFrom() {
        return createdFrom.plusHours(8);
    }

    public LocalDateTime getCreatedTo() {
        return createdTo.plusHours(8);
    }
}
