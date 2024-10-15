package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.CodeType;
import com.fixedasset.service.CodeTypeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.annotation.Resource;

@Tag(name = "Code Type")
@RestController
@RequestMapping("/base/code_type")
public class CodeTypeController extends BaseController {
    @Resource private CodeTypeService codeTypeService;

    @Operation(summary = "Create")
    @PostMapping("/create")
    public Result create(@RequestBody CodeType codeType) {
        codeTypeService.createOne(codeType);
        return Result.succ(codeType);
    }

    @Operation(summary = "Batch to import")
    @PostMapping("/batch-create")
    public Result batchCreate(@RequestBody List<CodeType> codeTypes) {
        codeTypeService.batchImport(codeTypes);
        return Result.succ(codeTypes);
    }

    @Operation(summary = "Update")
    @PostMapping("/update")
    public Result update(@RequestBody CodeType codeType) {
        codeTypeService.updateOne(codeType);
        return Result.succ(codeType);
    }

    @Operation(summary = "Get one by id")
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(codeTypeService.getById(id));
    }

    @Operation(summary = "Get all value by type")
    @PostMapping("/getAllValue")
    public Result getAllValue(@RequestBody CodeType codeType) {
        return Result.succ(codeTypeService.getAllList(codeType));
    }

    @Operation(summary = "Void one by id")
    @DeleteMapping("/remove/{id}")
    public Result remove(@PathVariable("id") Long id) {
        codeTypeService.remove(id);
        return Result.succ(id);
    }

    @Operation(summary = "Page and list")
    @PostMapping("/listAll")
    public Result listAll(@RequestBody CodeType codeType) {
        Page page = new Page(codeType.getPage(), codeType.getLimit());
        LambdaQueryWrapper<CodeType> queryWrapper = Wrappers.lambdaQuery();

        if(!StringUtils.isEmpty(codeType.getType())) {
            queryWrapper.like(CodeType::getType, codeType.getType());
        }

        if(!StringUtils.isEmpty(codeType.getValueCode())) {
            queryWrapper.like(CodeType::getValueCode, codeType.getValueCode());
        }

        if(!StringUtils.isEmpty(codeType.getValueName())) {
            queryWrapper.like(CodeType::getValueName, codeType.getValueName());
        }

        queryWrapper.eq(CodeType::getStatu, 1);
        Page<CodeType> iPage = codeTypeService.page(page, queryWrapper);
        return Result.succ(iPage);
    }


}
