package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.Department;
import com.fixedasset.mapper.DepartmentMapper;
import com.fixedasset.service.ActionRecordService;
import com.fixedasset.service.DepartmentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DepartmentServiceImpl extends ServiceImpl<DepartmentMapper, Department> implements DepartmentService {

    @Resource DepartmentMapper departmentMapper;

    @Resource private ActionRecordService actionRecordService;

    public void createNew(Department department) {
        LambdaQueryWrapper<Department> queryWrapper = Wrappers.lambdaQuery();
        if (StringUtils.isNotBlank(department.getDeptCode())) {
            queryWrapper.eq(Department::getDeptCode, department.getDeptCode());
        }
        queryWrapper.eq(Department::getStatu, 1);
        Department checkOne = departmentMapper.selectOne(queryWrapper);
        if (checkOne == null) {
                department.setCreated(LocalDateTime.now());
                department.setStatu(1);
                departmentMapper.insert(department);

                actionRecordService.createdAction(
                    "Save", 
                    "POST", 
                    "Department Manger", 
                    department.toString(), 
                    "Success"
                );

        } else {
            actionRecordService.createdAction(
                "Save", 
                "POST", 
                "Department Manger", 
                department.toString(), 
                "Failure"
            );

            throw new RuntimeException("Exist in records!");         
        }
    }

    public void batchImport(List<Department> departments) {
        for (Department department : departments) {
            createNew(department);
        }
    }

    public void removeOne(Department department) {
        LambdaQueryWrapper<Department> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Department::getId, department.getId());
        queryWrapper.eq(Department::getStatu, 1);
        Department checkOne = departmentMapper.selectOne(queryWrapper);
        if (checkOne.getId().equals(department.getId())) {
            actionRecordService.createdAction(
                    "Void", 
                    "DELETE", 
                    "Department Manger", 
                    department.toString(), 
                    "Success"
            );
            
            departmentMapper.updateById(department);

        } else {
            actionRecordService.createdAction(
                "Void", 
                "DELETE",
                "Department Manger", 
                department.toString(), 
                "Failure"
            );
            throw new RuntimeException("No active data in records!");
        }
    }

    public void update(Department department) {
        LambdaQueryWrapper<Department> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Department::getId, department.getId());
        queryWrapper.eq(Department::getStatu, 1);
        Department checkOne = departmentMapper.selectOne(queryWrapper);

        if (checkOne.getId().equals(department.getId())) {

            departmentMapper.updateById(department);

            actionRecordService.createdAction(
                    "Update", 
                    "POST", 
                    "Department Manger", 
                    department.toString(), 
                    "Success"
            );
        } else {
            actionRecordService.createdAction(
                "Update", 
                "POST",
                "Department Manger", 
                department.toString(), 
                "Failure"
            );
            throw new RuntimeException("Not active data in records!");
        }
    }

    public List<Department> getAll() {
        LambdaQueryWrapper<Department> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Department::getStatu, 1);
        return departmentMapper.selectList(queryWrapper);
    }

    public Department getData(Department department) {
        LambdaQueryWrapper<Department> queryWrapper = Wrappers.lambdaQuery();
        if (StringUtils.isNotBlank(department.getDeptCode())) {
            queryWrapper.eq(Department::getDeptCode, department.getDeptCode());
        }
        if (StringUtils.isNotBlank(department.getDeptName())) {
            queryWrapper.eq(Department::getDeptName, department.getDeptName());
        }
        queryWrapper.eq(Department::getStatu, 1);
        return departmentMapper.selectOne(queryWrapper);
    }
}
