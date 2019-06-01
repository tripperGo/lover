package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.ISysUserDao;
import com.mright.lover.platform.entity.SysUser;
import com.mright.lover.platform.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:39 PM
 * @desc:
 */
@Service
public class SysUserServiceImpl implements ISysUserService {

    private final ISysUserDao iSysUserDao;

    @Autowired
    public SysUserServiceImpl(ISysUserDao iSysUserDao) {
        this.iSysUserDao = iSysUserDao;
    }

    @Override
    public SysUser getUserById(Integer id) {

        return iSysUserDao.getUserById(id);
    }
}
