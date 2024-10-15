package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
@TableName("write_off")
@Component
public class WriteOff {
    @Schema(description = "The data id, Only apply for response and update apis")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "The asset data Id")
    @TableField("asset_id")
    private int assetId;

    @Schema(description = "The place Id in the last location")
    @TableField("last_place_id")
    private int lastPlaceId;

    @Schema(description = "Write off reason")
    @TableField("reason")
    private String reason;

    @Schema(description = "Last write off date stamp")
    @TableField("last_day")
    private LocalDateTime lastDay;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page = 1;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit = 10;
}
