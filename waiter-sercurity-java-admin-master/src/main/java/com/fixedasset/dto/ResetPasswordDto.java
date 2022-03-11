package com.fixedasset.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ResetPasswordDto implements Serializable {
    private String username;
    private String newPassword;
}
