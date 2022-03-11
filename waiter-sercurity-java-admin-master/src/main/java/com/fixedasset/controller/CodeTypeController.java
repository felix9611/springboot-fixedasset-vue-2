package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.CodeType;
import com.fixedasset.service.CodeTypeService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;

@RestController
@RequestMapping("/base/code_type")
public class CodeTypeController extends BaseController {
    @Resource private CodeTypeService codeTypeService;

    @PostMapping("/create")
    public Result create(@RequestBody CodeType codeType) {
        codeTypeService.createOne(codeType);
        return Result.succ(codeType);
    }

    @PostMapping("/update")
    public Result update(@RequestBody CodeType codeType) {
        codeTypeService.updateOne(codeType);
        return Result.succ(codeType);
    }

    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(codeTypeService.getById(id));
    }

    @PostMapping("/getAllValue")
    public Result getAllValue(@RequestBody CodeType codeType) {
        return Result.succ(codeTypeService.getAllList(codeType));
    }
    @DeleteMapping("/remove/{id}")
    public Result remove(@PathVariable("id") Long id) {
        codeTypeService.remove(id);
        return Result.succ(id);
    }
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
