package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SysUser extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @Schema(description = "Username")
    @NotBlank(message = "Username cannot be empty")
    private String username;

    @Schema(description = "Passeord, use BCrypt encoder")
    private String password;

    @Schema(description = "Avatar URL, Useless")
    private String avatar;

    @Schema(description = "Department ID")
    @TableField("dept_id")
    private int deptId;

    @Schema(description = "Avatar image base64 code")
    @TableField("avatar_base64")
    private String avatarBase64;

    @Schema(description = "Email address")
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email format is incorrect")
    private String email;

    @Schema(description = "City Code")
    private String city;

    @Schema(description = "Last Login")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastLogin;

    @Schema(description = "System Role lists,Only apply for response")
    @TableField(exist = false)
    private List<SysRole> sysRoles = new ArrayList<>();

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit;

}
