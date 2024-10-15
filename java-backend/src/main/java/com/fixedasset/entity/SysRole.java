package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;


@Data
@EqualsAndHashCode(callSuper = true)
@Component
public class SysRole extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @Schema(description = "The data id, Only apply for response and update apis")
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Schema(description = "The role code")
    @NotBlank(message = "Code cannot be empty")
    private String code;
    
    @Schema(description = "Remark")
    private String remark;

    @Schema(description = "Listing menu ids, Only apply for response")
    @TableField(exist = false)
    private List<Long> menuIds = new ArrayList<>();


}
