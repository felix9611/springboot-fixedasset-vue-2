package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 
 * </p>
 *
 * @author WaiterXiaoYY
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Component
public class SysRole extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @NotBlank(message = "角色名称不能为空")
    private String name;

    @NotBlank(message = "角色编码不能为空")
    private String code;
    
    private String remark;

    @TableField(exist = false)
    private List<Long> menuIds = new ArrayList<>();


}