package com.mright.lover.platform.entity;

import java.io.Serializable;
import java.util.Date;

public class Something implements Serializable {
    private Integer id;
    private String title;
    private Integer familyId;
    private String prefectureKey;
    private Date startTime;
    private Date endTime;
    private Integer goOver;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getFamilyId() {
        return familyId;
    }

    public void setFamilyId(Integer familyId) {
        this.familyId = familyId;
    }

    public String getPrefectureKey() {
        return prefectureKey;
    }

    public void setPrefectureKey(String prefectureKey) {
        this.prefectureKey = prefectureKey;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getGoOver() {
        return goOver;
    }

    public void setGoOver(Integer goOver) {
        this.goOver = goOver;
    }
}
