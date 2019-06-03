package com.mright.lover.platform.entity;

import java.io.Serializable;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:34 PM
 * @desc:
 */
public class SysUser implements Serializable {

    private Integer id;
    private String username;
    private String password;
    private Integer familyId;
    private String familyName;

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public Integer getFamilyId() {
        return familyId;
    }

    public void setFamilyId(Integer familyId) {
        this.familyId = familyId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
