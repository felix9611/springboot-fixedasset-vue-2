package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fixedasset.dto.StockTakeItemListRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Data
@TableName("stocktake")
public class StockTake implements Serializable {
    @Schema(description = "The data id, Only apply for response and update apis")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "The stock take action name")
    @TableField("action_name")
    private String actionName;

    @Schema(description = "Location Id for action")
    @TableField("action_place")
    private int actionPlace;

    @Schema(description = "Stock take created time, Only apply for response")
    @TableField("created_time")
    private LocalDateTime createdTime;

    @Schema(description = "Stock take finished time, Only apply for response")
    @TableField("finish_time")
    private LocalDateTime finishTime;

    @Schema(description = "Stock take status, 0 = Void, 1 = Active, 2 = Finished")
    @TableField("active")
    private int active;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit;

    @Schema(description = "Stock take items list, Only apply for response")
    @TableField(exist = false)
    private List<StockTakeItem> stockTakeItems;

    @Schema(description = "Stock take items list, Only apply for requesr in save")
    @TableField(exist = false)
    private List<StockTakeItemListRecord> stockTakeItemRecords;
}
