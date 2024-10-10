package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.CodeType;
import com.fixedasset.entity.Department;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.DepartmentMapper;
import com.fixedasset.service.DepartmentService;

import freemarker.template.utility.DeepUnwrap;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DepartmentServiceImpl extends ServiceImpl<DepartmentMapper, Department> implements DepartmentService {

    @Resource DepartmentMapper departmentMapper;

    @Resource
    ActionRecordMapper actionRecordMapper;

    @Resource private ActionRecord actionRecord;

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

                actionRecord.setActionName("Save");
                actionRecord.setActionMethod("POST");
                actionRecord.setActionFrom("Department Manger");
                actionRecord.setActionData(department.toString());
                actionRecord.setActionSuccess("Success");
                actionRecord.setCreated(LocalDateTime.now());
                this.createdAction(actionRecord);
        } else {
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
            actionRecord.setActionName("Remove");
            actionRecord.setActionMethod("DELETE");
            actionRecord.setActionFrom("Asset Type Manger");
            actionRecord.setActionData(department.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());
            this.createdAction(actionRecord);

            departmentMapper.updateById(department);
        } else {
            throw new RuntimeException("No active data in records!");
        }
    }

    public void update(Department department) {
        LambdaQueryWrapper<Department> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Department::getId, department.getId());
        queryWrapper.eq(Department::getStatu, 1);
        Department checkOne = departmentMapper.selectOne(queryWrapper);

        if (checkOne.getId().equals(department.getId())) {
            actionRecord.setActionName("Update");
            actionRecord.setActionMethod("POST");
            actionRecord.setActionFrom("Asset Type Manger");
            actionRecord.setActionData(department.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());
            this.createdAction(actionRecord);

            departmentMapper.updateById(department);
        } else {
            throw new RuntimeException("Not active data in records!");
        }
    }

    public List<Department> getAll() {
        LambdaQueryWrapper<Department> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Department::getStatu, 1);
        return departmentMapper.selectList(queryWrapper); // departmentMapper.getALL();
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

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
