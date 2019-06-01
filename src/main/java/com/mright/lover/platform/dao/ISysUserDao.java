package com.mright.lover.platform.dao;

import com.mright.lover.platform.entity.SysUser;
import org.springframework.stereotype.Repository;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:35 PM
 * @desc:
 */
@Repository
public interface ISysUserDao {

    SysUser getUserById(Integer id);
}
