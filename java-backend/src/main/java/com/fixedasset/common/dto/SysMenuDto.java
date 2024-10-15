package com.fixedasset.common.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * {
 * 					name: 'SysUser',
 * 					title: 'User Mangement',
 * 					icon: 'el-icon-s-custom',
 * 					path: '/sys/users',
 * 					component: 'sys/User',
 * 					children: []
 *
 *             icon: 'el-icon-lx-cascades',
 *             index: 'sys',
 *             path: '',
 *             name: 'sys',
 *             component: '',
 *             title: 'User Mangement',
 *             children: []
 */
@Data
public class SysMenuDto implements Serializable {

	@Schema(description = "Menu Id, response or update api only")
	private Long id;

	@Schema(description = "Menu Name")
	private String name;

	@Schema(description = "Menu Index")
	private String index;

	@Schema(description = "Menu title")
	private String title;

	@Schema(description = "Menu Icon String")
	private String icon;

	@Schema(description = "Sub URL")
	private String path;

	@Schema(description = "Component Path")
	private String component;

	@Schema(description = "0：main   1：item   2：button")
	private int type;

	@Schema(description = "The sub meun list, Only apply for response")
	private List<SysMenuDto> children = new ArrayList<>();

}
