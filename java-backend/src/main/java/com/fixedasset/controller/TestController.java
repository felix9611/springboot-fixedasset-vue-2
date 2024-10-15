package com.fixedasset.controller;

import com.fixedasset.common.lang.Result;
import com.fixedasset.service.SysUserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Testing")
@RestController
public class TestController {

    @Autowired
    SysUserService sysUserService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Operation(summary = "Only test get")
    @PreAuthorize("hasRole('admin')")
    @GetMapping("/test")
    public Object test() {
        return Result.succ(sysUserService.list());
    }

    @Operation(summary = "Test Password ")
    @PreAuthorize("hasAuthority('sys:user:list')")
    @GetMapping("/test/pass")
    public Result pass(){
        String password = bCryptPasswordEncoder.encode("111111");
        boolean matches = bCryptPasswordEncoder.matches("111111", password);
        System.out.println("Test" +matches);
        return Result.succ(password);
    }
}
