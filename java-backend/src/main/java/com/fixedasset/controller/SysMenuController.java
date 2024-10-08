package com.fixedasset.controller;


import cn.hutool.core.map.MapUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fixedasset.common.dto.SysMenuDto;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.SysMenu;
import com.fixedasset.entity.SysRoleMenu;
import com.fixedasset.entity.SysUser;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/sys/menu")
public class SysMenuController extends BaseController {

    @GetMapping("/nav")
    public Result nav(Principal principal) {
        SysUser sysUser = sysUserService.getByUsername(principal.getName());

        // Get perm
        String authorityInfo = sysUserService.getUserAuthorityInfo(sysUser.getId());
        String[] authorityInfoArray = StringUtils.tokenizeToStringArray(authorityInfo, ",");

        // Get Menus
        List<SysMenuDto> navs = sysMenuService.getCurrentUserNav();

        return Result.succ(MapUtil.builder()
                .put("authoritys", authorityInfoArray)
                .put("nav", navs)
                .map()
        );
    }

    @GetMapping("/info/{id}")
    @PreAuthorize("hasAuthority('sys:menu:list')")
    public Result info(@PathVariable(name = "id") Long id) {
        return Result.succ(sysMenuService.getById(id));
    }

    @GetMapping("/list")
    @PreAuthorize("hasAuthority('sys:menu:list')")
    public Result list() {

        List<SysMenu> menus = sysMenuService.tree();
        return Result.succ(menus);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('sys:menu:save')")
    public Result save(@Validated @RequestBody SysMenu sysMenu) {

        // sysMenu.setCreated(LocalDateTime.now());
        // sysMenu.setStatu(1);
        sysMenuService.createOneMeun(sysMenu);
        return Result.succ(sysMenu);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('sys:menu:update')")
    public Result update(@Validated @RequestBody SysMenu sysMenu) {
        sysMenuService.updateOne(sysMenu);
        // Clear all permission cache related to this menu
        sysUserService.clearUserAuthorityInfoByMenuId(sysMenu.getId());
        return Result.succ(sysMenu);
    }

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('sys:menu:delete')")
    public Result delete(@PathVariable("id") Long id) {

        int count = sysMenuService.count(new QueryWrapper<SysMenu>().eq("parent_id", id));
        if (count > 0) {
            return Result.fail("Please delete the submenu first");
        }

        sysUserService.clearUserAuthorityInfoByMenuId(id);

        sysMenuService.voidOne(id);

        sysRoleMenuService.remove(new QueryWrapper<SysRoleMenu>().eq("menu_id", id));
        return Result.succ("");
    }

}
