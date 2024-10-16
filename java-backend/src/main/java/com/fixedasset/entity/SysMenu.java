package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Component
public class SysMenu extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * Parent menu ID, first-level menu is 0
     */
    @Schema(description = "The upper-level menu item id")
    @NotNull(message = "The upper-level menu cannot be empty")
    private Long parentId;

    @Schema(description = "The Menu name")
    @NotBlank(message = "Menu name cannot be empty")
    private String name;

    /**
     * URL
     */
    @Schema(description = "The URL")
    private String path;

    /**
     * permission code
     */
    @Schema(description = "The perms code")
    @NotBlank(message = "Menu authorization code cannot be empty")
    private String perms;

    @Schema(description = "The component path")
    private String component;

    /**
     * type     0：main   1：item   2：button
     */
    @Schema(description = "0：main   1：item   2：button")
    @NotNull(message = "Menu type cannot be empty")
    private Integer type;

    /**
     * Icon
     */
    @Schema(description = "The icon string")
    private String icon;

    /**
     * Sorting
     */
    @Schema(description = "The sorting order number")
    @TableField("orderNum")
    private Integer orderNum;


    @Schema(description = "The index, Only apply for response")
    @TableField(exist = false)
    private String index;

    @Schema(description = "The sub meun list, Only apply for response")
    @TableField(exist = false)
    private List<SysMenu> children = new ArrayList<>();


}
