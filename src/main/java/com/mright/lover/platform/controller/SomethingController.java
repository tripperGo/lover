package com.mright.lover.platform.controller;

import com.mright.lover.platform.entity.Something;
import com.mright.lover.platform.service.ISomethingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    public List<Something> listSomethingByKey(@PathVariable(name = "key", required = false) String key) {
        return iSomethingService.listSomethingByKey(key, ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
    }

    @GetMapping("/list")
    public List<Something> listSomething() {
        return iSomethingService.listSomething(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
    }

    @GetMapping("/listAll")
    public List<Something> listAllSomething() {
        return iSomethingService.listAllSomething();
    }

    @PostMapping("/update")
    public String update(Something something){
        return iSomethingService.update(something);
    }

    @GetMapping("/delete")
    public String delete(Integer id){
        return iSomethingService.delete(id);
    }
}
