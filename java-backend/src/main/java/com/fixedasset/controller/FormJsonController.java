package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.FormJson;
import com.fixedasset.service.FormJsonService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/base/form/json")
public class FormJsonController  extends BaseController{
    @Resource
    private FormJsonService formJsonService;

    @PostMapping("/create")
    public Result create(@RequestBody FormJson formJson) {
        formJsonService.create(formJson);
        return Result.succ(formJson);
    }

    @PostMapping("/update")
    public Result update(@RequestBody FormJson formJson) {
        formJsonService.update(formJson);
        return Result.succ(formJson);
    }

    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(formJsonService.findOne(id));
    }

    @DeleteMapping("/remove/{id}")
    public Result removeOne(@PathVariable("id") Long id) {
        formJsonService.remove(id);
        return Result.succ(id);
    }

    @PostMapping("/listAll")
    public Result listAll(@RequestBody FormJson formJson) {
        Page page = new Page(formJson.getPage(), formJson.getLimit());
        LambdaQueryWrapper<FormJson> queryWrapper = Wrappers.lambdaQuery();

        queryWrapper.eq(FormJson::getStatu, 1);
        Page<FormJson> iPage = formJsonService.page(page, queryWrapper);

        return Result.succ(iPage);
    }

    @PostMapping("/read")
    public  Result readOne(@RequestBody FormJson formJson){
        return Result.succ(formJsonService.readOne(formJson));
    }

}
