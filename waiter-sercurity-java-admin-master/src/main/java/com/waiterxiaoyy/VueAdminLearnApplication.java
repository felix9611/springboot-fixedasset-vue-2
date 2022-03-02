package com.waiterxiaoyy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import java.net.InetAddress;

/**
 * 功能描述：系统入口
 *
 * @Author WaiterXiaoYY
 * @Date 2022/1/13 20:29
 * @Version 1.0
 */
@SpringBootApplication
public class VueAdminLearnApplication {
    private static final Logger log = LoggerFactory.getLogger(VueAdminLearnApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(VueAdminLearnApplication.class);
    }
}
