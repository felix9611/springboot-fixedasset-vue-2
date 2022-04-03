package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.LoginRecord;

public interface LoginRecordService extends IService<LoginRecord> {

    void saveData(LoginRecord loginRecord);

}
