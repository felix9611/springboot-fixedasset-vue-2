package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
public class SysRoleMenu{
    @TableId(value = "id", type = IdType.AUTO)
    @Schema(description = "The data id, Only apply for response and update apis")
    private Long id;
    private static final long serialVersionUID = 1L;

    @Schema(description = "The role data id")
    private Long roleId;

    @Schema(description = "The menu data id")
    private Long menuId;


}
