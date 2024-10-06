package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.AssetType;
import com.fixedasset.service.AssetTypeService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/base/asset_type")
public class AssetTypeController extends BaseController {

    @Resource AssetTypeService assetTypeService;

    @PostMapping("/listAll")
    public Result listAll(@RequestBody AssetType assetType) {
        Page page = new Page(assetType.getPage(), assetType.getLimit());
        LambdaQueryWrapper<AssetType> queryWrapper = Wrappers.lambdaQuery();

        if(!StringUtils.isEmpty(assetType.getTypeCode())){
            queryWrapper.like(AssetType::getTypeCode, assetType.getTypeCode());
        }

        queryWrapper.orderByDesc(true, AssetType::getTypeCode);
        queryWrapper.eq(AssetType::getStatu, 1);
        Page<AssetType> iPage = assetTypeService.page(page, queryWrapper);

        return  Result.succ(iPage);
    }

    @PostMapping("/batch-create")
    public Result batchCreate(@RequestBody List<AssetType> assetTypes) {
        assetTypeService.batchImport(assetTypes);
        return Result.succ(assetTypes);
    }

    @PostMapping("/create")
    public Result create(@RequestBody AssetType assetType) {
        assetTypeService.save(assetType);
        return Result.succ(assetType);
    }
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(assetTypeService.getById(id));
    }

    @PostMapping("/update")
    public Result update(@RequestBody AssetType assetType) {
        assetTypeService.updateById(assetType);
        return Result.succ(assetType);
    }
    @DeleteMapping("/remove/{id}")
    public Result remove(@PathVariable("id") Long id) {
        AssetType assetType = new AssetType();
        assetType.setUpdated(LocalDateTime.now());
        assetType.setId(id);
        assetType.setStatu(0);
        assetTypeService.remove(assetType);
        return  Result.succ(assetType);
    }
    @GetMapping("/getAll")
    public Result getAll() {
        return Result.succ(assetTypeService.getAll());
    }

    @PostMapping("/post/findOne")
    public Result findOnePost(@RequestBody AssetType assetType) {
        return Result.succ(assetTypeService.getData(assetType));
    }
}
