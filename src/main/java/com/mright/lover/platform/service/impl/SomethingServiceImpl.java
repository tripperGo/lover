package com.mright.lover.platform.service.impl;

import com.mright.lover.platform.dao.IDictionaryDao;
import com.mright.lover.platform.dao.IFamilyDao;
import com.mright.lover.platform.dao.ISomethingDao;
import com.mright.lover.platform.entity.Dictionary;
import com.mright.lover.platform.entity.Something;
import com.mright.lover.platform.entity.SysFamily;
import com.mright.lover.platform.service.ISomethingService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SomethingServiceImpl implements ISomethingService {

    private final ISomethingDao iSomethingDao;
    private final IFamilyDao iFamilyDao;
    private final IDictionaryDao iDictionaryDao;

    @Autowired
    public SomethingServiceImpl(ISomethingDao iSomethingDao,
                                IFamilyDao iFamilyDao,
                                IDictionaryDao iDictionaryDao) {
        this.iSomethingDao = iSomethingDao;
        this.iFamilyDao = iFamilyDao;
        this.iDictionaryDao = iDictionaryDao;
    }

    @Override
    public List<Something> listSomethingByKey(String key, String username) {
        if (StringUtils.isEmpty(key)) {
            return iSomethingDao.listSomething(username);
        }
        return iSomethingDao.listSomethingByKeyAndUsername(key, username);
    }

    @Override
    public List<Something> listSomething(String username) {
        return iSomethingDao.listSomething(username);
    }

    @Override
    public List<Something> listAllSomething() {
        List<Something> somethingList = iSomethingDao.listAllSomething();
        Set<Integer> familyIds = new HashSet<>();
        Set<String> prefectureKeys = new HashSet<>();
        somethingList.forEach(something -> {
            familyIds.add(something.getFamilyId());
            prefectureKeys.add(something.getPrefectureKey());
        });

        List<SysFamily> familyList = null;
        if (familyIds.size() > 0) {
            familyList = iFamilyDao.listFamilyByIds(familyIds);
        }

        List<Dictionary> dictionaryList = null;
        if (prefectureKeys.size() > 0) {
            dictionaryList = iDictionaryDao.listDicByTypeAndInKeysNoRoot("prefecture", prefectureKeys);
        }

        List<SysFamily> finalFamilyList = familyList;
        List<Dictionary> finalDictionaryList = dictionaryList;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        somethingList.forEach(something -> {
            if (finalFamilyList != null && finalFamilyList.size() > 0) {
                for (SysFamily family : finalFamilyList) {
                    if (something.getFamilyId().equals(family.getId())) {
                        something.setFamilyName(family.getFamilyName());
                        break;
                    }
                }
            }
            if (finalDictionaryList != null && finalDictionaryList.size() > 0) {
                for (Dictionary dictionary : finalDictionaryList) {
                    if (something.getPrefectureKey().equals(dictionary.getKey())) {
                        something.setPrefectureValue(dictionary.getValue());
                        break;
                    }
                }
            }
            Date startTime = something.getStartTime();
            Date endTime = something.getEndTime();
            if (startTime != null) {
                something.setStartTimeStr(sdf.format(startTime));
            }
            if (endTime != null) {
                something.setEndTimeStr(sdf.format(endTime));
            }
        });

        return somethingList;
    }

    @Override
    public String update(Something something) {
        Integer familyId = something.getFamilyId();
        String prefectureKey = something.getPrefectureKey();
        String title = something.getTitle();
        if (familyId == null) {
            return "家庭ID不能为空";
        }
        if (StringUtils.isEmpty(prefectureKey)) {
            return "区块不能为空";
        }
        if (StringUtils.isEmpty(title)) {
            return "标题不能为空";
        }

        String startTimeStr = something.getStartTimeStr();
        String endTimeStr = something.getEndTimeStr();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        if (StringUtils.isNotEmpty(startTimeStr)) {
            try {
                something.setStartTime(sdf.parse(startTimeStr));
            } catch (ParseException e) {
                return "startTime格式不对：yyyy-MM-dd hh:mm:ss";
            }
        }

        if (StringUtils.isNotEmpty(endTimeStr)) {
            try {
                something.setEndTime(sdf.parse(endTimeStr));
            } catch (ParseException e) {
                return "endTime格式不对：yyyy-MM-dd hh:mm:ss";
            }
        }

        Integer id = something.getId();
        if (id == null) {
            // 新增
            something.setGoOver(0);
            int count = iSomethingDao.insert(something);
            return count > 0 ? "增加成功" : "增加失败";
        } else {
            // 修改
            int count = iSomethingDao.update(something);
            return count > 0 ? "修改成功" : "修改失败";
        }
    }

    @Override
    public String delete(Integer id) {
        if(id == null){
            return "id不能为空";
        }

        int count = iSomethingDao.delete(id);
        return count > 0 ? "删除成功" : "删除失败";
    }
}
