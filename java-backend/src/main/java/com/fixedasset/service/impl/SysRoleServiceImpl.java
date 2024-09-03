package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
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

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author WaiterXiaoYY
 * @since 2022-01-13
 */
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
    }

    public SysRole createNewRole(SysRole newData) {


        sysRoleMapper.insert(newData);

        actionRecord.setActionName("Created Role");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("System Role Manger");
        actionRecord.setActionData(sysRole.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());

        return newData;
    }

    public SysRole updateRole(SysRole data) {


        sysRoleMapper.insert(data);

        actionRecord.setActionName("Update Role");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("System Role Manger");
        actionRecord.setActionData(sysRole.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());

        return data;
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
