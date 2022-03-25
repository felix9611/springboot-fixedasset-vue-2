package com.fixedasset.dto;

import com.fixedasset.entity.InvRecord;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = false)
@Data
public class FindInvRecordDto extends InvRecord {
    private LocalDateTime createdTo;
    private LocalDateTime createdFrom;
}
