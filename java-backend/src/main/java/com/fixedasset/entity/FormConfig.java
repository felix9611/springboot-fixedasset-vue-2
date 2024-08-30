package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("form_config")
public class FormConfig extends BaseEntity {
    @TableField("form_name")
    private String fromName;

    @TableField("form_type")
    private String fromType;

    @TableField("config_json")
    private String config;
}
