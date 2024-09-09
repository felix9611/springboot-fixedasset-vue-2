package com.fixedasset.common.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class PassDto implements Serializable {

	@NotBlank(message = "New Password cannot be empty")
	private String password;

	@NotBlank(message = "OLD Password cannot be empty")
	private String currentPass;
}
