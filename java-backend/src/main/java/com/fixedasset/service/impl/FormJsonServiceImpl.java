package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.FormJson;
import com.fixedasset.mapper.FormJsonMapper;
import com.fixedasset.service.FormJsonService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@Service
public class FormJsonServiceImpl extends ServiceImpl<FormJsonMapper, FormJson> implements FormJsonService {
    @Resource private FormJsonMapper formJsonMapper;

    @Resource private FormJson formJson;

    public void create(FormJson formJson) {
        formJson.setCreated(LocalDateTime.now());
        formJson.setStatu(1);

        formJsonMapper.insert(formJson);
    }

    public FormJson findOne(Long id) {
        return formJsonMapper.selectById(id);
    }

    public void update(FormJson formJson) {
        formJson.setUpdated(LocalDateTime.now());
        formJsonMapper.updateById(formJson);
    }

    public void remove(Long id) {
        formJson.setId(id);
        formJson.setStatu(0);
        formJsonMapper.updateById(formJson);
    }

    public FormJson readOne(FormJson formJson) {
        LambdaQueryWrapper<FormJson> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(FormJson::getStatu, 1);
        queryWrapper.eq(FormJson::getPath, formJson.getPath());
        queryWrapper.eq(FormJson::getMethod, formJson.getMethod());
        return formJsonMapper.selectOne(queryWrapper);
    }
}
