package com.mright.lover.platform.controller;

import com.mright.lover.platform.entity.SysUser;
import com.mright.lover.platform.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:38 PM
 * @desc:
 */
@RestController
@RequestMapping("/user")
public class SysUserController {

    private final ISysUserService iSysUserService;

    @Autowired
    public SysUserController(ISysUserService iSysUserService) {
        this.iSysUserService = iSysUserService;
    }

    /**
     * 根据ID查询用户信息
     * @param id 用户ID
     * @return 用户详情
     */
    @GetMapping("/{id}")
    public SysUser getUserById(@PathVariable(name = "id") Integer id){
        return iSysUserService.getUserById(id);
    }
}
