package com.fixedasset.service;

import com.fixedasset.entity.SysRole;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface SysRoleService extends IService<SysRole> {

    List<SysRole> listRolesByUserId(Long id);

    String voidById(Long id);

    SysRole createNewRole(SysRole newData);

    SysRole updateRole(SysRole data);
}
