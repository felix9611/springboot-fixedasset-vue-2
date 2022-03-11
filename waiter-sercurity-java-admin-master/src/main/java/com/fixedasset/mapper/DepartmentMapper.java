package com.fixedasset.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fixedasset.entity.Department;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface DepartmentMapper extends BaseMapper<Department> {

    @Select("Select * from Department where statu = 1")
    List<Department> getALL();
}
