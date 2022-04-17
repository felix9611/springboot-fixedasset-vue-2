package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
@TableName("write_off")
@Component
public class WriteOff {
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("asset_id")
    private int assetId;

    @TableField("last_place_id")
    private int lastPlaceId;

    @TableField("reason")
    private String reason;

    @TableField("last_day")
    private LocalDateTime lastDay;

    @TableField(exist = false)
    private int page = 1;

    @TableField(exist = false)
    private int limit = 10;
}
