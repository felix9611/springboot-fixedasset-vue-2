package com.fixedasset.swagger;
/*
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
// import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

// @EnableOpenApi
@Configuration
public class SwaggerConfig {
    //讀取application.properties 檔案設定的是否開啟swagger屬性，正式環境一般需要關閉
    @Value(value = "${swagger.enabled}")
    Boolean swaggerEnabled;

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.OAS_30).apiInfo(apiInfo())
                // 是否開啟swagger
                .enable(swaggerEnabled).select()
                // 過濾條件，掃描指定路徑下的檔案
                .apis(RequestHandlerSelectors.basePackage("com.fixedasset.controller"))
                //只保留/user/*風格的路徑，大家可以除錯一下
//                .paths(PathSelectors.ant("/user/*"))
                // 指定路徑處理，PathSelectors.any()代表不過濾任何路徑
                .paths(PathSelectors.any())
                .build().pathMapping("/");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Fixed Asset System X VUE2.0")
                .description("Felix")
                // 開發者資訊
                .contact(new Contact("Felix", "https://github.com/felix9611", "jp.coreching@gmail.com"))
                .version("1.0.0")
                .build();
    }
}
*/