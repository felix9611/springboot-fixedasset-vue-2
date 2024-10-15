package com.fixedasset.dto;

import lombok.Data;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
public class ResetPasswordDto implements Serializable {
    @Schema(description = "Username")
    private String username;

    @Schema(description = "New Password")
    private String newPassword;
}
