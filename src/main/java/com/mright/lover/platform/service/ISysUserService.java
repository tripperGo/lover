package com.mright.lover.platform.service;

import com.mright.lover.platform.entity.SysUser;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:39 PM
 * @desc:
 */
public interface ISysUserService {

    /**
     * 根据ID查询用户信息
     * @param id 用户ID
     * @return 用户详情
     */
    SysUser getUserById(Integer id);

    /**
     * 创建用户
     *
     * @param user 用户实体
     * @return 结果
     */
    SysUser createUser(SysUser user);
}
