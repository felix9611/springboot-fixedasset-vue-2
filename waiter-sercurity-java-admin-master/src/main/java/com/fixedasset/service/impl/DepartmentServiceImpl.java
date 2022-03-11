package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.Department;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.DepartmentMapper;
import com.fixedasset.service.DepartmentService;
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

        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Department Manger");
        actionRecord.setActionData(department.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        departmentMapper.insert(department);
    }

    public void removeOne(Department department) {
        actionRecord.setActionName("Remove");
        actionRecord.setActionMethod("DELETE");
        actionRecord.setActionFrom("Asset Type Manger");
        actionRecord.setActionData(department.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        departmentMapper.updateById(department);
    }

    public void update(Department department) {
        actionRecord.setActionName("Update");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Asset Type Manger");
        actionRecord.setActionData(department.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        departmentMapper.updateById(department);
    }

    public List<Department> getAll() {
        return departmentMapper.getALL();
    }

    public int createdAction(ActionRecord actionRecord) {
        return actionRecordMapper.insert(actionRecord);
    }
}
