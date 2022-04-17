package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.WriteOff;

public interface WriteOffService extends IService<WriteOff> {
    void saveWriteOff(WriteOff writeOff);
}
