package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Data
@TableName("login_record")
@Component
public class LoginRecord {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("username")
    private String username;

    @TableField("login_time")
    private LocalDateTime loginTime;

    @TableField("login_status")
    private String loginStatus;

    @TableField("ip_address")
    private String ipAddress;

    @TableField(exist = false)
    private int page = 1;

    @TableField(exist = false)
    private int limit = 10;

}
