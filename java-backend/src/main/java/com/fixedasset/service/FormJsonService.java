package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.FormJson;

public interface FormJsonService  extends IService<FormJson> {
    void create(FormJson formJson);
    FormJson findOne(Long id);
    void update(FormJson formJson);
    void remove(Long id);
    FormJson readOne(FormJson formJson);
}
