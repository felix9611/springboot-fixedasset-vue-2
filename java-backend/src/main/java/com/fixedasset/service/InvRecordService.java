package com.fixedasset.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.dto.FindInvRecordDto;
import com.fixedasset.dto.InvRecordListDto;
import com.fixedasset.entity.InvRecord;

public interface InvRecordService extends IService<InvRecord> {
    void saveNewRecord(String assetCode, int placeId);

    void saveRecord(int assetId, int newPlaceId);

    void writeOff(String assetCode, int placeId);

    Page<InvRecordListDto> newPage(Page page, LambdaQueryWrapper<FindInvRecordDto> queryWrapper);
}
