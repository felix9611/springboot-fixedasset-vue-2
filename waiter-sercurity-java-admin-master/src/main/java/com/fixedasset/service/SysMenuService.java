package com.fixedasset.service;

import com.fixedasset.common.dto.SysMenuDto;
import com.fixedasset.entity.SysMenu;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author WaiterXiaoYY
 * @since 2022-01-13
 */
public interface SysMenuService extends IService<SysMenu> {

    List<SysMenuDto> getCurrentUserNav();

    List<SysMenu> tree();
}
