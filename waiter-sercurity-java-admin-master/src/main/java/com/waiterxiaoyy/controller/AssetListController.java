package com.waiterxiaoyy.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.waiterxiaoyy.common.lang.Result;
import com.waiterxiaoyy.dto.AssetListViewDTO;
import com.waiterxiaoyy.entity.AssetList;
import com.waiterxiaoyy.entity.AssetType;
import com.waiterxiaoyy.service.AssetListService;
// import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/asset/assetList")
public class AssetListController extends BaseController {

    @Resource AssetListService assetListService;

    @PostMapping("/listAll")
    public Result listAll(@RequestBody AssetList assetList) {
        Page page = new Page(assetList.getPage(), assetList.getLimit());
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isBlank(assetList.getAssetName())){
            queryWrapper.like(AssetList::getAssetName, assetList.getAssetName());
        }
        if (!StringUtils.isBlank(assetList.getTypeId())) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!StringUtils.isBlank(assetList.getPlaceId())) {
            queryWrapper.eq(AssetList::getPlaceId, assetList.getPlaceId());
        }
        if (!StringUtils.isBlank(assetList.getDeptId())) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }

        queryWrapper.orderByDesc(true, AssetList::getAssetCode);
        queryWrapper.eq(AssetList::getStatu, 1);
        Page<AssetListViewDTO> iPage = assetListService.newPage(page, queryWrapper);
        return Result.succ(iPage);
    }

    @GetMapping("/getTotalSum")
    public Result getTotalSum() {
        return Result.succ(assetListService.sumTotal());
    }

    @PostMapping("/create")
    public Result create(@RequestBody AssetList assetList) {
        assetListService.createNew(assetList);
        return Result.succ(assetList);
    }

    @PostMapping("/update")
     public Result update(@RequestBody AssetList assetList) {
        assetListService.update(assetList);
        return Result.succ(assetList);
    }

    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(assetListService.getById(id));
    }

    @DeleteMapping("/remove/{id}")
    public Result remove(@PathVariable("id") Long id) {
        assetListService.remove(id);
        return Result.succ(id);
    }

    @PostMapping("/findAsset")
    public Result findAsset(@RequestBody AssetList assetList) {
        AssetList assetList1 = assetListService.findOne(assetList);
        return Result.succ(assetList1);
    }
}
