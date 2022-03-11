package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.service.ActionRecordService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/base/action")
public class ActionRecordController extends BaseController {

    @Resource ActionRecordService actionRecordService;

    @PostMapping("/listAll")
    public Result listAll(@RequestBody ActionRecord actionRecord) {
        Page page = new Page(actionRecord.getPage(), actionRecord.getLimit());
        LambdaQueryWrapper<ActionRecord> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.orderByDesc(true, ActionRecord::getCreated);
        Page<ActionRecord> iPage = actionRecordService.page(page, queryWrapper);
        return Result.succ(iPage);
    }
}
