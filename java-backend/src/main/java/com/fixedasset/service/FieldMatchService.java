package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.FieldMatch;

import java.util.List;

public interface FieldMatchService extends IService<FieldMatch> {
    void createNaw(FieldMatch fieldMatch);

    void removeOne(FieldMatch fieldMatch);

    void updateOne(FieldMatch fieldMatch);

    List<FieldMatch> findByCategory(String category);

    List<FieldMatch> findBqQuery(FieldMatch fieldMatch);
}
