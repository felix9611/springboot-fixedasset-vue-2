package com.fixedasset;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication
public class VueAdminLearnApplication {
    private static final Logger log = LoggerFactory.getLogger(VueAdminLearnApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(VueAdminLearnApplication.class);
    }
}
