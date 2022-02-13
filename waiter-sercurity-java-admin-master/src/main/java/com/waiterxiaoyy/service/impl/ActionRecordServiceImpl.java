package com.waiterxiaoyy.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.waiterxiaoyy.entity.ActionRecord;
import com.waiterxiaoyy.mapper.ActionRecordMapper;
import com.waiterxiaoyy.service.ActionRecordService;
import org.springframework.stereotype.Service;

@Service
public class ActionRecordServiceImpl extends ServiceImpl<ActionRecordMapper, ActionRecord> implements ActionRecordService {
}
