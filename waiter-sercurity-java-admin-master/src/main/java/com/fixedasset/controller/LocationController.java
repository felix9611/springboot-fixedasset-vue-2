package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.AssetType;
import com.fixedasset.entity.Location;
import com.fixedasset.service.LocationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/base/location")
public class LocationController extends BaseController {
    @Resource LocationService locationService;

    @GetMapping("/getAll")
    public Result getAll() {
        return Result.succ(locationService.getAll());
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('base:dept:create')")
    public Result create(@RequestBody Location location) {
        location.setCreated(LocalDateTime.now());
        location.setStatu(1);
        locationService.createNew(location);
        return Result.succ(location);
    }

    @PostMapping("/update")
    // @PreAuthorize("hasAuthority('base:dept:update')")
    public Result update(@RequestBody Location location) {
        location.setUpdated(LocalDateTime.now());
        locationService.update(location);
        return Result.succ(location);
    }

    @DeleteMapping("/remove/{id}")
    public Result remove(@PathVariable("id") Long id) {
        Location location = new Location();
        location.setId(id);
        location.setUpdated(LocalDateTime.now());
        location.setStatu(0);
        locationService.remove(location);
        return Result.succ(id);
    }
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(locationService.getById(id));
    }

    @PostMapping("/listAll")
    public Result listAll(@RequestBody Location location) {
        Page page = new Page(location.getPage(), location.getLimit());
        LambdaQueryWrapper<Location> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isEmpty(location.getPlaceCode())) {
            queryWrapper.like(Location::getPlaceCode, location.getPlaceCode());
        }

        queryWrapper.orderByDesc(true, Location::getPlaceCode);
        queryWrapper.eq(Location::getStatu, 1);
        Page<Location> iPage = locationService.page(page, queryWrapper);
        return Result.succ(iPage);
    }

    @PostMapping("/post/findOne")
    public Result findOnePost(@RequestBody Location location) {
        return Result.succ(locationService.getData(location));
    }
}
