package com.mright.lover.platform.service;

import com.mright.lover.platform.entity.SysFamily;

import java.util.List;

/**
 * @author : zhaochuanzhen
 * @date : 2019/6/3 10:17
 * @Desc:
 */
public interface IFamilyService {
    List<SysFamily> listFamily();

    String update(SysFamily family);

    String delete(Integer id);

    SysFamily getFamilyById(Integer id);
}
