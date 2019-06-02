package com.mright.lover.platform.service;

import com.mright.lover.platform.entity.Something;

import java.util.List;

public interface ISomethingService {

    List<Something> listSomethingByKey(String key, String username);

    List<Something> listSomething(String username);
}
