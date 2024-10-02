package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
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
    @NotNull(message = "The upper-level menu cannot be empty")
    private Long parentId;

    @NotBlank(message = "Menu name cannot be empty")
    private String name;

    /**
     * URL
     */
    private String path;

    /**
     * permission code
     */
    @NotBlank(message = "Menu authorization code cannot be empty")
    private String perms;

    private String component;

    /**
     * type     0：main   1：item   2：button
     */
    @NotNull(message = "Menu type cannot be empty")
    private Integer type;

    /**
     * Icon
     */
    private String icon;

    /**
     * Sorting
     */
    @TableField("orderNum")
    private Integer orderNum;


    @TableField(exist = false)
    private String index;

    @TableField(exist = false)
    private List<SysMenu> children = new ArrayList<>();


}
