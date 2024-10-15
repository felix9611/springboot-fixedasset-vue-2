package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.Vendor;
import com.fixedasset.service.VendorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.annotation.Resource;

@Tag(name = "Vendor")
@RestController
@RequestMapping("/base/vendor")
public class VendorController extends BaseController {

    @Resource private VendorService vendorService;

    @Resource private Vendor vendor;

    @Operation(summary = "Create a vendor")
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('base:dept:create')")
    public Result create(@RequestBody Vendor vendor) {
        vendorService.createOne(vendor);
        return Result.succ(vendor);
    }

    @Operation(summary = "Batch create vendors")
    @PostMapping("/batch-create")
    public Result batchCreate(@RequestBody List<Vendor> vendors) {
        vendorService.batchImport(vendors);
        return Result.succ(vendors);
    }

    @Operation(summary = "Update a vendor")
    @PostMapping("/update")
    public Result update(@RequestBody Vendor vendor) {
        vendorService.updateOne(vendor);
        return Result.succ(vendor);
    }

    @Operation(summary = "Void one by id")
    @DeleteMapping("/remove/{id}")
    // @PreAuthorize("hasAuthority('base:dept:remove')")
    public Result remove(@PathVariable("id") Long id) {
        vendor.setId(id);
        vendor.setStatu(0);
        vendorService.removeOne(vendor);
        return Result.succ(vendor);
    }

    @Operation(summary = "Get one by id")
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(vendorService.getById(id));
    }

    @PostMapping("/post/findOne")
    public Result findOnePost(@RequestBody Vendor vendor) {
        return Result.succ(vendorService.findOne(vendor));
    }


    @Operation(summary = "Page and list")
    @PostMapping("/listAll")
    public  Result listAll(@RequestBody Vendor vendor) {
        Page page = new Page(vendor.getPage(), vendor.getLimit());
        LambdaQueryWrapper<Vendor> queryWrapper = Wrappers.lambdaQuery();

        if (StringUtils.isNotBlank(vendor.getVendorCode())){
            queryWrapper.eq(Vendor::getVendorCode, vendor.getVendorCode());
        }

        if (StringUtils.isNotBlank(vendor.getVendorName())) {
            queryWrapper.eq(Vendor::getVendorName, vendor.getVendorName());
        }

        queryWrapper.orderByDesc(true, Vendor::getVendorCode);
        queryWrapper.eq(Vendor::getStatu, 1);
        Page<Vendor> iPage = vendorService.page(page, queryWrapper);
        return Result.succ(iPage);
    }

    @Operation(summary = "Get all vendors")
    @GetMapping("/getAll")
    public Result getAll() {
        return Result.succ(vendorService.getAll());
    }

}
