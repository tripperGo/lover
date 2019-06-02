package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.ISomethingDao;
import com.mright.lover.platform.entity.Something;
import com.mright.lover.platform.service.ISomethingService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class SomethingServiceImpl implements ISomethingService {

    private final ISomethingDao iSomethingDao;

    @Autowired
    public SomethingServiceImpl(ISomethingDao iSomethingDao) {
        this.iSomethingDao = iSomethingDao;
    }

    @Override
    public List<Something> listSomethingByKey(String key, String username) {
        if(StringUtils.isEmpty(key)){
            return Collections.emptyList();
        }
        return iSomethingDao.listSomethingByKeyAndUsername(key, username);
    }
}
