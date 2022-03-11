package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.Department;
import com.fixedasset.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("/base/department")
public class DepartmentController {

    @Resource private DepartmentService departmentService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('base:dept:create')")
    public Result create(@RequestBody Department department) {
        department.setCreated(LocalDateTime.now());
        department.setStatu(1);
        departmentService.createNew(department);
        return Result.succ(department);
    }

    @PostMapping("/update")
    // @PreAuthorize("hasAuthority('base:dept:update')")
    public Result update(@RequestBody Department department) {
        department.setUpdated(LocalDateTime.now());
        departmentService.update(department);
        return Result.succ(department);
    }

    @DeleteMapping("/remove/{id}")
    // @PreAuthorize("hasAuthority('base:dept:remove')")
    public Result remove(@PathVariable("id") Long id) {
        Department department = new Department();
        department.setUpdated(LocalDateTime.now());
        department.setId(id);
        department.setStatu(0);
        log.debug(department.toString());
        departmentService.removeOne(department);
        return Result.succ(department);
    }

    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(departmentService.getById(id));
    }

    @GetMapping("/getAll")
    public Result getAll() {
        return Result.succ(departmentService.getAll());
    }

    @PostMapping("/listAll")
    public Result listAll(@RequestBody Department department) {
        Page page = new Page(department.getPage(), department.getLimit());
        LambdaQueryWrapper<Department> queryWrapper = Wrappers.lambdaQuery();

        if(!StringUtils.isEmpty(department.getDeptCode())){
            queryWrapper.like(Department::getDeptCode, department.getDeptCode());
        }

        queryWrapper.orderByDesc(true, Department::getDeptCode);
        queryWrapper.eq(Department::getStatu, 1);
        Page<Department> iPage = departmentService.page(page, queryWrapper);
        return Result.succ(iPage);
    }
}
