package com.mright.lover;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.mright.lover.platform.dao")
@SpringBootApplication
public class LoverApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoverApplication.class, args);
    }

}
