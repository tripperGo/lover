package com.mright.lover.platform.dao;

import com.mright.lover.platform.entity.SysFamily;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * @author : zhaochuanzhen
 * @date : 2019/6/3 10:20
 * @Desc:
 */
@Repository
public interface IFamilyDao {

    List<SysFamily> listFamily();

    int insert(SysFamily family);

    int update(SysFamily family);

    int delete(Integer id);

    List<SysFamily> listFamilyByIds(@Param("familyIds") Set<Integer> familyIds);

    SysFamily getFamilyById(@Param("id") Integer id);
}
