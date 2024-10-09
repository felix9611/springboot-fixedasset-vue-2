package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.StockTakeFormListDTO;
import com.fixedasset.entity.StockTake;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StockTakeMapper extends BaseMapper<StockTake> {

    List<StockTake> getALL();

    List<StockTake> getALLFinished();

    Page<StockTakeFormListDTO> newPage(Page page, @Param("ew") Wrapper queryWrapper);
}
