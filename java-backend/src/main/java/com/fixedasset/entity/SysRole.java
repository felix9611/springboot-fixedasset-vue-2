package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
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

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotBlank(message = "Code cannot be empty")
    private String code;
    
    private String remark;

    @TableField(exist = false)
    private List<Long> menuIds = new ArrayList<>();


}
