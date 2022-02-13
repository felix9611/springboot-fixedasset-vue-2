package com.waiterxiaoyy.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.waiterxiaoyy.entity.AssetType;

import java.util.List;

public interface AssetTypeService extends IService<AssetType> {

    void createNew(AssetType assetType);

    void update(AssetType assetType);

    void remove(AssetType assetType);

    List<AssetType> getAll();
}
