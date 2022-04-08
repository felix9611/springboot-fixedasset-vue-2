package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("code_type")
public class CodeType extends BaseEntity {
    @TableField("type")
    private String type;

    @TableField("value_code")
    private String valueCode;

    @TableField("value_name")
    private String valueName;

    @TableField(exist = false)
    private int page = 1;

    @TableField(exist = false)
    private int limit = 10;
}
