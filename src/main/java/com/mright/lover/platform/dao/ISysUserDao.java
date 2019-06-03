package com.mright.lover.platform.dao;

import com.mright.lover.platform.entity.SysUser;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:35 PM
 * @desc:
 */
@Repository
public interface ISysUserDao {

    SysUser getUserById(Integer id);

    SysUser getUserByUsername(@Param("username") String username);

    int createUser(SysUser user);

    List<SysUser> list();

    int update(SysUser user);

    int delete(Integer id);
}
