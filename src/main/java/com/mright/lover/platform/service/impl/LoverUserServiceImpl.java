package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.ISysUserDao;
import com.mright.lover.platform.entity.SysUser;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class LoverUserServiceImpl implements UserDetailsService {

    private final ISysUserDao iSysUserDao;
//    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoverUserServiceImpl(ISysUserDao iSysUserDao/*,
                                PasswordEncoder passwordEncoder*/) {
        this.iSysUserDao = iSysUserDao;
//        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (StringUtils.isEmpty(username)) {
            throw new UsernameNotFoundException("请输入用户名");
        }

        SysUser user = iSysUserDao.getUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("请输入用户名");
        }

        Set<GrantedAuthority> authorities = new HashSet<>(4);
        GrantedAuthority grantedAuthority = (GrantedAuthority) () -> "SYS_USER";
        authorities.add(grantedAuthority);
        return new User(username, /*passwordEncoder.encode(*/user.getPassword()/*)*/, authorities);
    }
}
