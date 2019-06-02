package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.IDictionaryDao;
import com.mright.lover.platform.entity.Dictionary;
import com.mright.lover.platform.service.IDictionaryService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class DictionaryServiceImpl implements IDictionaryService {

    private final IDictionaryDao iDictionaryDao;

    @Autowired
    public DictionaryServiceImpl(IDictionaryDao iDictionaryDao) {
        this.iDictionaryDao = iDictionaryDao;
    }

    @Override
    public List<Dictionary> listDicByTypeNoRoot(String type) {
        if (StringUtils.isEmpty(type)) {
            return Collections.emptyList();
        }
        return iDictionaryDao.listDicByTypeNoRoot(type);
    }

    @Override
    public List<Dictionary> listAllDicByTypeNoRoot(String type) {
        if (StringUtils.isEmpty(type)) {
            return Collections.emptyList();
        }
        return iDictionaryDao.listAllDicByTypeNoRoot(type);
    }

    @Override
    public String update(Dictionary dictionary) {
        String result;
        if (dictionary.getId() == null) {
            result = "id不能为空";
            return result;
        }
        iDictionaryDao.update(dictionary);
        result = "修改成功";
        return result;
    }

    @Override
    public String delete(Integer id) {
        String result;
        if (id == null) {
            result = "id不能为空";
            return result;
        }

        iDictionaryDao.delete(id);
        result = "删除成功";
        return result;
    }
}
