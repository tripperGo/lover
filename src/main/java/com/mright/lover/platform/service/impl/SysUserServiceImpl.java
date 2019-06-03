package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.IFamilyDao;
import com.mright.lover.platform.dao.ISysUserDao;
import com.mright.lover.platform.entity.SysFamily;
import com.mright.lover.platform.entity.SysUser;
import com.mright.lover.platform.service.ISysUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:39 PM
 * @desc:
 */
@Service
public class SysUserServiceImpl implements ISysUserService {

    private final ISysUserDao iSysUserDao;
    private final IFamilyDao iFamilyDao;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SysUserServiceImpl(ISysUserDao iSysUserDao,
                              PasswordEncoder passwordEncoder,
                              IFamilyDao iFamilyDao) {
        this.iSysUserDao = iSysUserDao;
        this.passwordEncoder = passwordEncoder;
        this.iFamilyDao = iFamilyDao;
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

    @Override
    public List<SysUser> list() {
        List<SysUser> userList = iSysUserDao.list();
        Set<Integer> familyIds = new HashSet<>();
        userList.forEach(user -> familyIds.add(user.getFamilyId()));
        List<SysFamily> familyList = iFamilyDao.listFamilyByIds(familyIds);
        userList.forEach(user -> {
            for (SysFamily family : familyList) {
                if (user.getFamilyId().equals(family.getId())) {
                    user.setFamilyName(family.getFamilyName());
                    break;
                }
            }
        });
        return userList;
    }

    @Override
    public String update(SysUser user) {
        String result;
        Integer id = user.getId();
        String password = user.getPassword();
        if (StringUtils.isNotEmpty(password)) {
            user.setPassword(passwordEncoder.encode(password));
        }
        if (id == null) {
            // 新增
            int count = iSysUserDao.createUser(user);
            result = count > 0 ? "新增成功" : "新增失败";
        } else {
            // 修改
            int count = iSysUserDao.update(user);
            result = count > 0 ? "修改成功" : "修改失败";
        }
        return result;
    }

    @Override
    public String delete(Integer id) {
        int count = iSysUserDao.delete(id);
        return count > 0 ? "删除成功" : "删除失败";
    }
}
