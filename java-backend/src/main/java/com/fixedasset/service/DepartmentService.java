package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.Department;

import java.util.List;

public interface DepartmentService extends IService<Department> {

    void createNew(Department department);

    void removeOne(Department department);

    void update(Department department);

    List<Department> getAll();

    public Department getData(Department department);

}
