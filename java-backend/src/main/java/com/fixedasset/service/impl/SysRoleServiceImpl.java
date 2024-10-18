package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fixedasset.entity.SysRole;
import com.fixedasset.mapper.SysRoleMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.SysRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

@Service
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements SysRoleService {

    @Resource SysRoleMapper sysRoleMapper;

    @Resource SysRole sysRole;

    @Resource private ActionRecordService actionRecordService;

    @Override
    public List<SysRole> listRolesByUserId(Long userId) {

        List<SysRole> sysRoles = this.list(new QueryWrapper<SysRole>()
                .inSql("id", "select role_id from sys_user_role where user_id = " + userId));

        return sysRoles;
    }

    public String voidById(Long id) {
        LambdaQueryWrapper<SysRole> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SysRole::getId, id);
        queryWrapper.eq(SysRole::getStatu, 1);

        SysRole checkOne = this.getOne(queryWrapper);

        if (checkOne.getId().equals(id)) {
            sysRole.setId(id);
            sysRole.setStatu(0);
            sysRole.setUpdated(LocalDateTime.now());
            sysRoleMapper.updateById(sysRole);

            actionRecordService.createdAction(
                "Void", 
                "DELETE", 
                "System Role Manger", 
                sysRole.toString(), 
                "Success"
            );

            return "Role id was void:" + id.toString();
        } else {
            actionRecordService.createdAction(
                "Void", 
                "DELETE", 
                "System Role Manger", 
                id.toString(), 
                "failure"
            );
            throw new RuntimeException("Not active data in records!");
        }
    }

    public SysRole createNewRole(SysRole newData) {
        LambdaQueryWrapper<SysRole> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SysRole::getName, newData.getName());
        queryWrapper.eq(SysRole::getStatu, 1);
        SysRole checkOne = this.getOne(queryWrapper);
        if (checkOne == null) {
            newData.setCreated(LocalDateTime.now());
            newData.setStatu(0);
            sysRoleMapper.insert(newData);

            actionRecordService.createdAction(
                "Create", 
                "POST", 
                "System Role Manger", 
                newData.toString(), 
                "Success"
            );
            return newData;
        } else {
            actionRecordService.createdAction(
                "Create", 
                "POST", 
                "System Role Manger", 
                newData.toString(), 
                "failure"
            );
            throw new RuntimeException("Exist in lists! Please check again!");
        }
    }

    public SysRole updateRole(SysRole data) {
        LambdaQueryWrapper<SysRole> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SysRole::getId, data.getId());
        queryWrapper.eq(SysRole::getStatu, 1);

        SysRole checkOne = this.getOne(queryWrapper);

        if (checkOne.getId().equals(data.getId())) {
            sysRole.setUpdated(LocalDateTime.now());
            sysRoleMapper.updateById(data);

            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "System Role Manger", 
                sysRole.toString(), 
                "Success"
            );

            return data;
        } else {
            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "System Role Manger", 
                sysRole.toString(), 
                "failure"
            );
            throw new RuntimeException("Not active data in records!");
        }
    }
}
