package com.fixedasset.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Transient;

import com.fixedasset.entity.RepairRecord;

@EqualsAndHashCode(callSuper = true)
@Data
public class RepairRecordListDto extends RepairRecord {
    @Transient private String assetCode;
    @Transient private String assetName;
}
