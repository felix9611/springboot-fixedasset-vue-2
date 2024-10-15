package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 功能描述：
 *
 * @Author WaiterXiaoYY
 * @Date 2022/1/13 20:56
 * @Version 1.0
 */
@Data
public class BaseEntity implements Serializable {

    @Schema(description = "The data id, Only apply for response and update apis")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "Created date time,Only apply for response")
    private LocalDateTime created;

    @Schema(description = "Updated date time, Only apply for response")
    private LocalDateTime updated;

    @Schema(description = "Active status, 1 = Active, 0 = Void, Only apply for response")
    private int statu;
}

