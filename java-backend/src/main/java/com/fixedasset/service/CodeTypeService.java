package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.CodeType;

import java.util.List;

public interface CodeTypeService extends IService<CodeType> {
    List<CodeType> getAllList(CodeType codeType);

    void createOne(CodeType codeType);

    void updateOne(CodeType codeType);

    void remove(Long id);
}
