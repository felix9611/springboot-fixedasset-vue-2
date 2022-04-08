package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.service.ActionRecordService;
import org.springframework.stereotype.Service;

@Service
public class ActionRecordServiceImpl extends ServiceImpl<ActionRecordMapper, ActionRecord> implements ActionRecordService {
}
