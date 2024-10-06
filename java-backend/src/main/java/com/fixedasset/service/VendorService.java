package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.Vendor;

import java.util.List;

public interface VendorService extends IService<Vendor> {

    void createOne(Vendor vendor);

    void updateOne(Vendor vendor);

    void removeOne(Vendor vendor);

    Vendor findOne(Vendor vendor);

    List<Vendor> getAll();

    void batchImport(List<Vendor> vendors);

}
