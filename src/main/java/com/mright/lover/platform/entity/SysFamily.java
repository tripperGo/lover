package com.mright.lover.platform.entity;

import java.io.Serializable;

public class SysFamily implements Serializable {
    private Integer id;
    private String familyName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }
}
