package com.fixedasset.service.impl;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.common.dto.SysMenuDto;
import com.fixedasset.entity.SysMenu;
import com.fixedasset.entity.SysUser;
import com.fixedasset.mapper.SysMenuMapper;
import com.fixedasset.mapper.SysUserMapper;
import com.fixedasset.service.SysMenuService;
import com.fixedasset.service.SysUserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu> implements SysMenuService {

    @Resource
    SysUserService sysUserService;

    @Resource
    SysUserMapper sysUserMapper;

    @Resource private SysMenu sysMenu;

    @Override
    public List<SysMenuDto> getCurrentUserNav() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        SysUser sysUser = sysUserService.getByUsername(username);

        List<Long> menuIds = sysUserMapper.getNavMenuIds(sysUser.getId());

        LambdaQueryWrapper<SysMenu> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.in(SysMenu::getId, menuIds);
        queryWrapper.eq(SysMenu::getStatu, 1);
        List<SysMenu> menuList = this.list(queryWrapper);

        // Remove button lv
        Iterator<SysMenu> iterator = menuList.iterator();
        while(iterator.hasNext()) {
            SysMenu sysMenu = iterator.next();
            if(sysMenu.getType() == 2) {
                iterator.remove();
            }
        }

        // Convert to tree structure JSON
        List<SysMenu> menuTree = buildTreeMenu(menuList);

        // convert under dto


        return convert(menuTree);
    }

    @Override
    public List<SysMenu> tree() {
        // Get all
        List<SysMenu> sysMenus = this.list(new QueryWrapper<SysMenu>().orderByAsc("orderNum").eq("statu", 1));

        // Convert to tree structure JSON
        return buildTreeMenu(sysMenus);
    }

    private List<SysMenuDto> convert(List<SysMenu> menuTree) {
        List<SysMenuDto> menuDtos = new ArrayList<>();

        menuTree.forEach(m -> {
            SysMenuDto dto = new SysMenuDto();

            dto.setId(m.getId());
            dto.setName(m.getPerms());
            dto.setIndex(m.getPerms());
            dto.setTitle(m.getName());
            dto.setComponent(m.getComponent());
            dto.setPath(m.getPath());
            dto.setIcon(m.getIcon());
            dto.setType(m.getType());

            if (m.getChildren().size() > 0) {

                // The child node calls the current method to convert again
                dto.setChildren(convert(m.getChildren()));
            }

            menuDtos.add(dto);
        });

        return menuDtos;
    }

    private List<SysMenu> buildTreeMenu(List<SysMenu> menus) {

        List<SysMenu> finalMenus = new ArrayList<>();

        // Find child
        for (SysMenu menu : menus) {

            for (SysMenu e : menus) {

                if (menu.getId() == e.getParentId()) {
                    menu.getChildren().add(e);
                }

            }

            // Put Parent Id
            if (menu.getParentId() == 0L) {
                finalMenus.add(menu);
            }
        }

        System.out.println(JSONUtil.toJsonStr(finalMenus));
        return finalMenus;
    }
}
