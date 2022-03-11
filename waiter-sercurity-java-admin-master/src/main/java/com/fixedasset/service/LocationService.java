package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.Location;

import java.util.List;

public interface LocationService extends IService<Location> {
    void createNew(Location location);

    void update(Location location);

    void remove(Location location);

    List<Location> getAll();

    Location getData(Location location);
}
