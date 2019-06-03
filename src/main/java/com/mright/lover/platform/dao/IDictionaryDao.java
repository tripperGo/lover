package com.mright.lover.platform.dao;

import com.mright.lover.platform.entity.Dictionary;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author: mright
 * @date: Created in 2019/6/1 9:17 PM
 * @desc:
 */
@Repository
public interface IDictionaryDao {

    List<Dictionary> listDicByTypeNoRoot(@Param("type") String type);

    List<Dictionary> listAllDicByTypeNoRoot(@Param("type") String type);

    void update(Dictionary dictionary);

    void delete(Integer id);

    void insert(Dictionary dictionary);

    Dictionary getDicByTypeAndPid(@Param("type") String type, @Param("pid") String pid);
}
