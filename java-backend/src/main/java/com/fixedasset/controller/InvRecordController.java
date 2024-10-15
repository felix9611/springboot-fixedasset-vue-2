package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.dto.FindInvRecordDto;
import com.fixedasset.dto.InvRecordListDto;
import com.fixedasset.entity.InvRecord;
import com.fixedasset.service.InvRecordService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Tag(name =  "InvReocrd")
@RestController
@RequestMapping("/asset/invRecord")
public class InvRecordController {
    @Resource private InvRecordService invRecordService;
    
    @Operation(summary = "Page and list")
    @PostMapping("/listAll")
    public Result listAll(@RequestBody FindInvRecordDto findInvRecordDto) {
        Page page = new Page(findInvRecordDto.getPage(), findInvRecordDto.getLimit());
        LambdaQueryWrapper<FindInvRecordDto> queryWrapper = Wrappers.lambdaQuery();

        if ( !(findInvRecordDto.getCreatedFrom() == null) && !(findInvRecordDto.getCreatedTo() == null )) {
            queryWrapper.between(InvRecord::getCreated, findInvRecordDto.getCreatedFrom(), findInvRecordDto.getCreatedTo());
        }

        queryWrapper.orderByDesc(true, InvRecord::getCreated);
        Page<InvRecordListDto> iPage = invRecordService.newPage(page, queryWrapper);
        return Result.succ(iPage);
    }
}
