package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("test_code")
public class TestCode {
    @Schema(description = "The data id, Only apply for response or update api")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "The test code Only apply for response")
    @TableField("test_code")
    private String testCode;

    @Schema(description = "The test data entry")
    @TableField("test1")
    private String test;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit;
}
