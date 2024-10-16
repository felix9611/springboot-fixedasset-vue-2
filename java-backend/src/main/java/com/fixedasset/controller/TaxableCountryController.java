package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.dto.TaxInformationUploadData;
import com.fixedasset.entity.Location;
import com.fixedasset.entity.TaxableCountry;
import com.fixedasset.service.TaxableCountryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.apache.ibatis.annotations.Delete;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.annotation.Resource;

@Tag(name = "Tax Data")
@RestController
@RequestMapping("/system/country/tax")
public class TaxableCountryController extends BaseController {
    @Resource private TaxableCountryService taxableCountryService;


    @Operation(summary = "Create a Tax Data")
    @PostMapping("/create")
    public Result create(@RequestBody TaxableCountry taxableCountry) {
        taxableCountryService.createNew(taxableCountry);
        return Result.succ(taxableCountry);
    }

    @Operation(summary = "Batch to import tax datas")
    @PostMapping("/batch-create")
    public Result batchCreate(@RequestBody List<TaxInformationUploadData> taxInformationUploadDatas) {
        taxableCountryService.importData(taxInformationUploadDatas);
        return Result.succ(taxInformationUploadDatas);
    }

    @Operation(summary = "Update a tax data")
    @PostMapping("/update")
    public Result update(@RequestBody TaxableCountry taxableCountry) {
        taxableCountryService.update(taxableCountry);
        return Result.succ(taxableCountry);
    }

    @Operation(summary = "Void one by id")
    @DeleteMapping("/remove/{id}")
    public Result voidOne(@PathVariable("id") Long id) {
        taxableCountryService.voidData(id);
        return Result.succ(id);
    }

    @Operation(summary = "Get one by id")
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(taxableCountryService.findOne(id));
    }

    @Operation(summary = "Page and list")
    @PostMapping("/listAll")
    public Result listAll(@RequestBody TaxableCountry taxableCountry) {
        Page page = new Page(taxableCountry.getPage(), taxableCountry.getLimit());
        LambdaQueryWrapper<TaxableCountry> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isEmpty(taxableCountry.getCountryName())) {
            queryWrapper.like(TaxableCountry::getCountryName, taxableCountry.getCountryName());
        }

        if (!StringUtils.isEmpty(taxableCountry.getTaxName())) {
            queryWrapper.like(TaxableCountry::getTaxName, taxableCountry.getTaxName());
        }

        queryWrapper.eq(TaxableCountry::getStatu, 1);

        Page<TaxableCountry> iPage = taxableCountryService.page(page, queryWrapper);
        return Result.succ(iPage);

    }

    @Operation(summary = "Get all")
    @GetMapping("/getAll")
    public Result getAll() {
        return Result.succ(taxableCountryService.getAll());
    }
}
