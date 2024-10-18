package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.Location;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.LocationMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.LocationService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LocationServiceImpl extends ServiceImpl<LocationMapper, Location> implements LocationService {

    @Resource LocationMapper locationMapper;

    @Resource private ActionRecordService actionRecordService;

    public List<Location> getAll() {
        LambdaQueryWrapper<Location> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Location::getStatu, 1);
        return locationMapper.selectList(queryWrapper); //locationMapper.getALL();
    }

    public void batchImport(List<Location> locations) {
        for (Location location : locations) {
            this.createNew(location);
        }
    }

    public void createNew(Location location) {
        LambdaQueryWrapper<Location> queryWrapper = Wrappers.lambdaQuery();
        if(!StringUtils.isBlank(location.getPlaceCode())) {
            queryWrapper.eq(Location::getPlaceCode, location.getPlaceCode());
        }
        if(!StringUtils.isBlank(location.getPlaceName())) {
            queryWrapper.eq(Location::getPlaceName, location.getPlaceName());
        }
        queryWrapper.eq(Location::getStatu, 1);
        Location checkOne = locationMapper.selectOne(queryWrapper);
        if (checkOne == null) {
            location.setCreated(LocalDateTime.now());
            location.setStatu(1);
            locationMapper.insert(location);

            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Location Manger", 
                location.toString(), 
                "Success"
            );
        }  else {
            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Location Manger", 
                location.toString(), 
                "Failure"
            );
            throw new RuntimeException("Exist in records! Please check again!");
        }
    }

    public void update(Location location) {
        LambdaQueryWrapper<Location> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Location::getId, location.getId());
        queryWrapper.eq(Location::getStatu, 1);
        Location checkOne = locationMapper.selectOne(queryWrapper);

        if (checkOne.getId().equals(location.getId())) {
            location.setUpdated(LocalDateTime.now());
            locationMapper.updateById(location);

            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Location Manger", 
                location.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Update", 
                "POST", 
                "Location Manger", 
                location.toString(), 
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }
    }

    public void remove(Location location) {
        LambdaQueryWrapper<Location> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Location::getId, location.getId());
        queryWrapper.eq(Location::getStatu, 1);
        Location checkOne = locationMapper.selectOne(queryWrapper);
        if (checkOne.getId().equals(location.getId())) {

            locationMapper.updateById(location);

            actionRecordService.createdAction(
                "Remove", 
                "DELETE", 
                "Location Manger", 
                location.toString(), 
                "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Remove", 
                "DELETE", 
                "Location Manger", 
                location.toString(), 
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }
    }

    public Location getData(Location location) {
        LambdaQueryWrapper<Location> queryWrapper = Wrappers.lambdaQuery();
        if (StringUtils.isNotBlank(location.getPlaceCode())) {
            queryWrapper.eq(Location::getPlaceCode, location.getPlaceCode());
        }
        if (StringUtils.isNotBlank(location.getPlaceName())) {
            queryWrapper.eq(Location::getPlaceName, location.getPlaceName());
        }
        queryWrapper.eq(Location::getStatu, 1);
        return locationMapper.selectOne(queryWrapper);
    }

}
