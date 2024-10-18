package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.service.ActionRecordService;

import java.time.LocalDateTime;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service
public class ActionRecordServiceImpl extends ServiceImpl<ActionRecordMapper, ActionRecord> implements ActionRecordService {

    @Resource ActionRecord actionRecord;

    @Resource ActionRecordMapper actionRecordMapper;

    public void createdAction(String name, String method, String from, String data, String success) {
        actionRecord.setActionName(name);
        actionRecord.setActionMethod(method);
        actionRecord.setActionFrom(from);
        actionRecord.setActionData(data);
        actionRecord.setActionSuccess(success);
        actionRecord.setCreated(LocalDateTime.now());

        actionRecordMapper.insert(actionRecord);
    }

}
