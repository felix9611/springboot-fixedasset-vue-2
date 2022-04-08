package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.TestCode;

public interface TestCodeService extends IService<TestCode> {
    void createNew(TestCode testCode);
}
