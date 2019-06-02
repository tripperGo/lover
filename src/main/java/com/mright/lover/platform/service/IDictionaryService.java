package com.mright.lover.platform.service;

import com.mright.lover.platform.entity.Dictionary;

import java.util.List;

public interface IDictionaryService {

    List<Dictionary> listDicByTypeNoRoot(String type);

    List<Dictionary> listAllDicByTypeNoRoot(String type);

    String update(Dictionary dictionary);

    String delete(Integer id);
}
