package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.AssetType;

import java.util.List;

public interface AssetTypeService extends IService<AssetType> {

    void createNew(AssetType assetType);

    void update(AssetType assetType);

    void remove(AssetType assetType);

    List<AssetType> getAll();

    AssetType getData(AssetType assetType);
}
