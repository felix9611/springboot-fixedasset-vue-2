package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.TestCode;
import com.fixedasset.service.TestCodeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Tag(name = "Testing Code")
@RestController
@RequestMapping("/test/code")
public class TestCodeController extends BaseController {

    @Resource TestCodeService testCodeService;

    @Operation(summary = "Create")
    @PostMapping("/create")
    public Result create(@RequestBody TestCode testCode) {
        testCodeService.createNew(testCode);
        return Result.succ(testCode);
    }

    @Operation(summary = "Page and List")
    @PostMapping("/listAll")
    public Result listAll(@RequestBody TestCode testCode) {
        Page page = new Page(testCode.getPage(), testCode.getLimit());
        LambdaQueryWrapper<TestCode> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.orderByDesc(true, TestCode::getTestCode);
        Page<TestCode> iPage = testCodeService.page(page, queryWrapper);
        return Result.succ(iPage);
    }

}
