package com.fixedasset.controller;


import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Const;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.SysRole;
import com.fixedasset.entity.SysRoleMenu;
import com.fixedasset.entity.SysUserRole;

import org.apache.ibatis.annotations.Delete;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/sys/role")
public class SysRoleController extends BaseController {

    @Resource private SysRole sysRole;

    @PreAuthorize("hasAuthority('sys:role:list')")
    @GetMapping("/info/{id}")
    public Result info(@PathVariable("id") Long id) {

        SysRole sysRole = sysRoleService.getById(id);

        // Get the menu id associated with the role
        List<SysRoleMenu> roleMenus = sysRoleMenuService.list(new QueryWrapper<SysRoleMenu>().eq("role_id", id));
        List<Long> menuIds = roleMenus.stream().map(p -> p.getMenuId()).collect(Collectors.toList());

        sysRole.setMenuIds(menuIds);
        return Result.succ(sysRole);
    }

    @PreAuthorize("hasAuthority('sys:role:list')")
    @GetMapping("/list")
    public Result list(String name) {

        Page<SysRole> pageData = sysRoleService.page(getPage(),
                new QueryWrapper<SysRole>()
                        .like(StrUtil.isNotBlank(name), "name", name)
        );

        return Result.succ(pageData);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('sys:role:save')")
    public Result save(@Validated @RequestBody SysRole sysRole) {
        sysRoleService.createNewRole(sysRole);
        return Result.succ(sysRole);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('sys:role:update')")
    public Result update(@Validated @RequestBody SysRole sysRole) {
        sysRoleService.updateRole(sysRole);
        sysUserService.clearUserAuthorityInfoByRoleId(sysRole.getId());
        return Result.succ(sysRole);
    }

    @DeleteMapping("/void/{id}")
    @PreAuthorize("hasAuthority('sys:role:delete')")
    @Transactional
    public Result voidById(@PathVariable("id") Long id) {
        return Result.succ(sysRoleService.voidById(id));
    }

    @PostMapping("/delete")
    @PreAuthorize("hasAuthority('sys:role:delete')")
    @Transactional
    public Result info(@RequestBody Long[] ids) {

        sysRoleService.removeByIds(Arrays.asList(ids));

        // Delete intermediate table
        sysUserRoleService.remove(new QueryWrapper<SysUserRole>().in("role_id", ids));
        sysRoleMenuService.remove(new QueryWrapper<SysRoleMenu>().in("role_id", ids));

        // Cache synchronous deletion
        Arrays.stream(ids).forEach(id -> {
            // Refersh cache
            sysUserService.clearUserAuthorityInfoByRoleId(id);
        });

        return Result.succ("");
    }

    @Transactional
    @PostMapping("/perm/{roleId}")
    @PreAuthorize("hasAuthority('sys:role:perm')")
    public Result info(@PathVariable("roleId") Long roleId, @RequestBody Long[] menuIds) {

        List<SysRoleMenu> sysRoleMenus = new ArrayList<>();

        Arrays.stream(menuIds).forEach(menuId -> {
            SysRoleMenu roleMenu = new SysRoleMenu();
            roleMenu.setMenuId(menuId);
            roleMenu.setRoleId(roleId);

            sysRoleMenus.add(roleMenu);
        });

        // Remove and re-created
        sysRoleMenuService.remove(new QueryWrapper<SysRoleMenu>().eq("role_id", roleId));
        sysRoleMenuService.saveBatch(sysRoleMenus);

        // Delete cache
        sysUserService.clearUserAuthorityInfoByRoleId(roleId);

        return Result.succ(menuIds);
    }

}

