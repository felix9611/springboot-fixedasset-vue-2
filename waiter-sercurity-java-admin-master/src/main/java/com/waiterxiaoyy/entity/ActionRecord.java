package com.waiterxiaoyy.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Data
@TableName("action_record")
public class ActionRecord {
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("action_name")
    private String actionName;

    @TableField("action_method")
    private String actionMethod;

    @TableField("action_from")
    private String actionFrom;

    @TableField("action_data")
    private String actionData;

    @TableField("action_success")
    private String actionSuccess;

    private LocalDateTime created;

    @TableField(exist = false)
    private int page;

    @TableField(exist = false)
    private int limit;
}
