package com.waiterxiaoyy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.waiterxiaoyy.entity.ActionRecord;
import com.waiterxiaoyy.entity.AssetType;
import com.waiterxiaoyy.entity.Location;
import com.waiterxiaoyy.mapper.ActionRecordMapper;
import com.waiterxiaoyy.mapper.LocationMapper;
import com.waiterxiaoyy.service.LocationService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LocationServiceImpl extends ServiceImpl<LocationMapper, Location> implements LocationService {

    @Resource LocationMapper locationMapper;

    @Resource ActionRecordMapper actionRecordMapper;

    @Resource private ActionRecord actionRecord;

    public List<Location> getAll() {
        return locationMapper.getALL();
    }

    public void createNew(Location location) {
        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Location Manger");
        actionRecord.setActionData(location.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        locationMapper.insert(location);
    }

    public void update(Location location) {
        actionRecord.setActionName("Update");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Location Manger");
        actionRecord.setActionData(location.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        locationMapper.updateById(location);
    }

    public void remove(Location location) {
        actionRecord.setActionName("Remove");
        actionRecord.setActionMethod("DELETE");
        actionRecord.setActionFrom("Location Manger");
        actionRecord.setActionData(location.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        locationMapper.updateById(location);
    }

    public Location getData(Location location) {
        LambdaQueryWrapper<Location> queryWrapper = Wrappers.lambdaQuery();
        if (StringUtils.isNotBlank(location.getPlaceCode())) {
            queryWrapper.eq(Location::getPlaceCode, location.getPlaceCode());
        }
        if (StringUtils.isNotBlank(location.getPlaceName())) {
            queryWrapper.eq(Location::getPlaceName, location.getPlaceName());
        }
        return locationMapper.selectOne(queryWrapper);
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
