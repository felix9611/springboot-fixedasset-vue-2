package com.fixedasset.common.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

@Data
public class PassDto implements Serializable {

	@Schema(description = "New Password")
	@NotBlank(message = "New Password cannot be empty")
	private String password;

	@Schema(description = "Old Password")
	@NotBlank(message = "OLD Password cannot be empty")
	private String currentPass;
}
