package com.mright.lover.platform.dao;

import com.mright.lover.platform.entity.Dictionary;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * @author: mright
 * @date: Created in 2019/6/1 9:17 PM
 * @desc:
 */
@Repository
public interface IDictionaryDao {

    Dictionary listDicByTypeNoRoot(@Param("type") String type);
}
