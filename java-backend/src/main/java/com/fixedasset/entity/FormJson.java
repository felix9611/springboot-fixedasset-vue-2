package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("form_json")
public class FormJson extends BaseEntity{
    @TableField("path")
    private String path;

    @TableField("method")
    private String method;

    @TableField("mark")
    private String mark;

    @TableField("setting")
    private String setting;

    @TableField("formJson")
    private String formJson;

    @TableField(exist = false)
    private int page ;

    @TableField(exist = false)
    private int limit;
}
