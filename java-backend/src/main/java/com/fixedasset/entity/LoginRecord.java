package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Data
@TableName("login_record")
@Component
public class LoginRecord {
    @Schema(description = "The data id, Only apply for response")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "Username")
    @TableField("username")
    private String username;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "Login Date Time Stamp")
    @TableField("login_time")
    private LocalDateTime loginTime;

    @Schema(description = "Login Status")
    @TableField("login_status")
    private String loginStatus;

    @Schema(description = "IP Address")
    @TableField("ip_address")
    private String ipAddress;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page = 1;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit = 10;

}
