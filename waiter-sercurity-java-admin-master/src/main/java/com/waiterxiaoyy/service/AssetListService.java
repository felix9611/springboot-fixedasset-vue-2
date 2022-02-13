package com.waiterxiaoyy.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.waiterxiaoyy.dto.AssetListViewDTO;
import com.waiterxiaoyy.entity.AssetList;

public interface AssetListService extends IService<AssetList> {
    void createNew(AssetList assetList);

    Page<AssetListViewDTO> newPage(Page page, LambdaQueryWrapper<AssetList> queryWrapper);

    void remove(Long id);

    void update(AssetList assetList);

    int sumTotal();
}
