package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.IFamilyDao;
import com.mright.lover.platform.entity.SysFamily;
import com.mright.lover.platform.service.IFamilyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : zhaochuanzhen
 * @date : 2019/6/3 10:18
 * @Desc:
 */
@Service
public class FamilyServiceImpl implements IFamilyService {

    private final IFamilyDao iFamilyDao;

    public FamilyServiceImpl(IFamilyDao iFamilyDao) {
        this.iFamilyDao = iFamilyDao;
    }

    @Override
    public List<SysFamily> listFamily() {
//        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();

        return iFamilyDao.listFamily();
    }

    @Override
    public String update(SysFamily family) {
        Integer id = family.getId();
        String familyName = family.getFamilyName();
        if (StringUtils.isEmpty(familyName)) {
            return "家庭名称不能为空";
        }

        String result;
        if (id == null) {
            // 新增
            int count = iFamilyDao.insert(family);
            result = count > 0 ? "新增成功" : "新增失败";
        } else {
            // 修改
            int count = iFamilyDao.update(family);
            result = count > 0 ? "修改成功" : "修改失败";
        }
        return result;
    }

    @Override
    public String delete(Integer id) {
        if (id == null) {
            return "id不能为空";
        }

        int count = iFamilyDao.delete(id);
        return count > 0 ? "删除成功" : "删除失败";
    }

    @Override
    public SysFamily getFamilyById(Integer id) {
        return iFamilyDao.getFamilyById(id);
    }
}
