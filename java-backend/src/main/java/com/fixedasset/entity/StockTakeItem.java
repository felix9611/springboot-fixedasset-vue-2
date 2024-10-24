package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;
import java.io.Serializable;
import java.time.LocalDateTime;

@Component
@Data
@TableName("stocktake_item")
public class StockTakeItem implements Serializable {
    @Schema(description = "The data id, Only apply for response")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "The stock take id")
    @TableField("stocktake_id")
    private int stockTakeId;

    @Schema(description = "The asset data id")
    @TableField("asset_id")
    private int assetId;

    @Schema(description = "The asset code")
    @TableField("asset_code")
    private String assetCode;

    @Schema(description = "The location data Id")
    @TableField("place_id")
    private int placeId;

    @Schema(description = "Assset Status Detail")
    @TableField("status")
    private String status;

    @Schema(description = "Asset Check Time, Only apply for response")
    @TableField("check_time")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime checkTime;

    @Schema(description = "Remark")
    @TableField("remark")
    private String remark;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page = 1;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit = 10;

}
