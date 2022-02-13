package com.waiterxiaoyy.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.waiterxiaoyy.entity.Location;

import java.util.List;

public interface LocationService extends IService<Location> {
    void createNew(Location location);

    void update(Location location);

    void remove(Location location);

    List<Location> getAll();
}
