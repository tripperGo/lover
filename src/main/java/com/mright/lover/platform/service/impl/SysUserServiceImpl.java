package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.ISysUserDao;
import com.mright.lover.platform.entity.SysUser;
import com.mright.lover.platform.service.ISysUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:39 PM
 * @desc:
 */
@Service
public class SysUserServiceImpl implements ISysUserService {

    private final ISysUserDao iSysUserDao;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SysUserServiceImpl(ISysUserDao iSysUserDao,
                              PasswordEncoder passwordEncoder) {
        this.iSysUserDao = iSysUserDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public SysUser getUserById(Integer id) {
        return iSysUserDao.getUserById(id);
    }

    @Override
    public SysUser createUser(SysUser user) {
        if (StringUtils.isEmpty(user.getUsername())) {
            return null;
        } else if (StringUtils.isEmpty(user.getPassword())) {
            return null;
        } else if (user.getFamilyId() == null) {
            return null;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        iSysUserDao.createUser(user);
        return user;
    }
}
