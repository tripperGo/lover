package com.mright.lover.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:55 PM
 * @desc:
 */
@RestController
@RequestMapping("/index")
public class IndexController {

    @GetMapping()
    public String index() {
        return "/index";
    }
}
