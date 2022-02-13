package com.waiterxiaoyy.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.waiterxiaoyy.entity.TestCode;

public interface TestCodeService extends IService<TestCode> {
    void createNew(TestCode testCode);
}
