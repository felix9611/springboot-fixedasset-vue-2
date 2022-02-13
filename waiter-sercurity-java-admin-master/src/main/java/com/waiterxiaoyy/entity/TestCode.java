package com.waiterxiaoyy.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("test_code")
public class TestCode {
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("test_code")
    private String testCode;

    @TableField("test1")
    private String test;

    @TableField(exist = false)
    private int page;

    @TableField(exist = false)
    private int limit;
}
