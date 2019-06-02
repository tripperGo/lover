package com.mright.lover.platform.controller;

import com.mright.lover.platform.entity.SysUser;
import com.mright.lover.platform.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
     *
     * @param id 用户ID
     * @return 用户详情
     */
    @GetMapping("/{id}")
    public SysUser getUserById(@PathVariable(name = "id") Integer id) {
        return iSysUserService.getUserById(id);
    }

    /**
     * 创建用户
     *
     * @param user 用户实体
     * @return 结果
     */
    @PostMapping("/create")
    public SysUser createUser(SysUser user) {
        return iSysUserService.createUser(user);
    }
}
