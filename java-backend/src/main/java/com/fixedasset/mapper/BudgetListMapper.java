package com.fixedasset.mapper;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.BudgetListDto;
import com.fixedasset.entity.BudgetList;

public interface BudgetListMapper extends BaseMapper<BudgetList> {
    Page<BudgetListDto> pageAndList(Page page, @Param("ew") Wrapper<BudgetList> queryWrapper);
}
