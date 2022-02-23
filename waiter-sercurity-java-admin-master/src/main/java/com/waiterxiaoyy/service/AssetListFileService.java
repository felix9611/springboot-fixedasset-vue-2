package com.waiterxiaoyy.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.waiterxiaoyy.entity.AssetListFile;

import java.util.List;

public interface AssetListFileService extends IService<AssetListFile> {

    void saveListPicture(AssetListFile assetListFile);

    List<AssetListFile> getByAssetId(AssetListFile assetListFile);

    void removeFile(Long id);
}
