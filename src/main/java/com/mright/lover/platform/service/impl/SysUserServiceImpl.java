package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.IDictionaryDao;
import com.mright.lover.platform.dao.ISysUserDao;
import com.mright.lover.platform.entity.Dictionary;
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
    private final IDictionaryDao iDictionaryDao;

    @Autowired
    public SysUserServiceImpl(ISysUserDao iSysUserDao,
                              IDictionaryDao iDictionaryDao) {
        this.iSysUserDao = iSysUserDao;
        this.iDictionaryDao = iDictionaryDao;
    }

    @Override
    public SysUser getUserById(Integer id) {
        Dictionary aa = iDictionaryDao.listDicByTypeNoRoot("perfecture");
        return iSysUserDao.getUserById(id);
    }
}
