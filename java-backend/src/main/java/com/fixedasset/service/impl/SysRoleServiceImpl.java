package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fixedasset.common.lang.Const;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.SysRole;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.SysRoleMapper;
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
    @Resource ActionRecordMapper actionRecordMapper;
    @Resource SysRole sysRole;
    @Resource private ActionRecord actionRecord;
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

            actionRecord.setActionName("Delete Role");
            actionRecord.setActionMethod("DELETE");
            actionRecord.setActionFrom("System Role Manger");
            actionRecord.setActionData(sysRole.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());
            this.createdAction(actionRecord);

            return "Role id was void:" + id.toString();
        } else {
            throw new RuntimeException("Not active data in records!");
        }
    }

    public SysRole createNewRole(SysRole newData) {
        LambdaQueryWrapper<SysRole> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SysRole::getName, newData.getName());
        queryWrapper.eq(SysRole::getStatu, 1);
        SysRole checkOne = this.getOne(queryWrapper);
        if (checkOne != null) {
            sysRole.setCreated(LocalDateTime.now());
            sysRole.setStatu(0);
            sysRoleMapper.insert(newData);

            actionRecord.setActionName("Created Role");
            actionRecord.setActionMethod("POST");
            actionRecord.setActionFrom("System Role Manger");
            actionRecord.setActionData(sysRole.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());

            return newData;
        } else {
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

            actionRecord.setActionName("Update Role");
            actionRecord.setActionMethod("POST");
            actionRecord.setActionFrom("System Role Manger");
            actionRecord.setActionData(sysRole.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());
    
            return data;
        } else {
            throw new RuntimeException("Not active data in records!");
        }
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
