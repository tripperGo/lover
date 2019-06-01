package com.mright.lover.platform.entity;

import java.io.Serializable;

/**
 * @author: mright
 * @date: Created in 2019/6/1 9:17 PM
 * @desc:
 */
public class Dictionary implements Serializable {

    private Integer id;
    private String pid;
    private String key;
    private String value;
    private String type;
    private Integer sort;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }
}
