package com.waiterxiaoyy.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;
import java.io.Serializable;
import java.time.LocalDateTime;

@Component
@Data
@TableName("stocktake_item")
public class StockTakeItem implements Serializable {
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("stocktake_id")
    private int stockTakeId;

    @TableField("asset_id")
    private int assetId;

    @TableField("asset_code")
    private String assetCode;

    @TableField("place_id")
    private int placeId;

    @TableField("status")
    private String status;

    @TableField("check_time")
    private LocalDateTime checkTime;

    @TableField("remark")
    private String remark;

    @TableField(exist = false)
    private int page = 1;

    @TableField(exist = false)
    private int limit = 10;

}
