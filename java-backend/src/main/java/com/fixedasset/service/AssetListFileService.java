package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.AssetListFile;

import java.util.List;

public interface AssetListFileService extends IService<AssetListFile> {

    void saveListPicture(AssetListFile assetListFile);

    List<AssetListFile> getByAssetId(AssetListFile assetListFile);

    void removeFile(Long id);
}
