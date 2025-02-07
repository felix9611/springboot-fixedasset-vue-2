package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.AssetType;
import com.fixedasset.entity.Department;
import com.fixedasset.entity.Location;
import com.fixedasset.service.LocationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Location")
@RestController
@RequestMapping("/base/location")
public class LocationController extends BaseController {
    @Resource LocationService locationService;

    @Operation(summary = "Get all locations")
    @GetMapping("/getAll")
    public Result getAll() {
        return Result.succ(locationService.getAll());
    }

    @Operation(summary = "Create a location")
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('base:dept:create')")
    public Result create(@RequestBody Location location) {
        locationService.createNew(location);
        return Result.succ(location);
    }

    @Operation(summary = "Batch to import locations")
    @PostMapping("/batch-create")
    @PreAuthorize("hasAuthority('base:dept:create')")
    public Result batchCreate(@RequestBody List<Location> locations) {
        locationService.batchImport(locations);
        return Result.succ(locations);
    }

    @Operation(summary = "Update a location")
    @PostMapping("/update")
    // @PreAuthorize("hasAuthority('base:dept:update')")
    public Result update(@RequestBody Location location) {
        
        locationService.update(location);
        return Result.succ(location);
    }

    @Operation(summary = "Void one by id")
    @DeleteMapping("/remove/{id}")
    public Result remove(@PathVariable("id") Long id) {
        Location location = new Location();
        location.setId(id);
        location.setUpdated(LocalDateTime.now());
        location.setStatu(0);
        locationService.remove(location);
        return Result.succ(id);
    }

    @Operation(summary = "Get one by id")
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(locationService.getById(id));
    }

    @Operation(summary = "Page and list")
    @PostMapping("/listAll")
    public Result listAll(@RequestBody Location location) {
        Page page = new Page(location.getPage(), location.getLimit());
        LambdaQueryWrapper<Location> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isEmpty(location.getName())) {
            queryWrapper.like(Location::getPlaceCode, location.getName()).or().like(Location::getPlaceName, location.getName());
        }

        queryWrapper.orderByDesc(true, Location::getPlaceCode);
        queryWrapper.eq(Location::getStatu, 1);
        Page<Location> iPage = locationService.page(page, queryWrapper);
        return Result.succ(iPage);
    }

    @Operation(summary = "Find one by place code or name")
    @PostMapping("/post/findOne")
    public Result findOnePost(@RequestBody Location location) {
        return Result.succ(locationService.getData(location));
    }
}
