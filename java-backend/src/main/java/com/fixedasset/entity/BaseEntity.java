package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class BaseEntity implements Serializable {

    @Schema(description = "The data id, Only apply for response and update apis")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "Created date time,Only apply for response")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;

    @Schema(description = "Updated date time, Only apply for response")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updated;

    @Schema(description = "Active status, 1 = Active, 0 = Void, Only apply for response")
    private int statu;
}

