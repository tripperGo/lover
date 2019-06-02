package com.mright.lover.platform.controller;

import com.mright.lover.platform.entity.Something;
import com.mright.lover.platform.service.ISomethingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/something")
public class SomethingController {

    private final ISomethingService iSomethingService;

    @Autowired
    public SomethingController(ISomethingService iSomethingService) {
        this.iSomethingService = iSomethingService;
    }

    @GetMapping("/list/{key}")
    public List<Something> listSomethingByKey(@PathVariable(name = "key") String key) {
        return iSomethingService.listSomethingByKey(key, ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
    }
}
