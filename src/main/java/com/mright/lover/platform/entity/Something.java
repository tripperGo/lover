package com.mright.lover.platform.entity;

import java.io.Serializable;
import java.util.Date;

public class Something implements Serializable {
    private Integer id;
    private String title;
    private Integer familyId;
    private String familyName;
    private String prefectureKey;
    private String prefectureValue;
    private Date startTime;
    private String startTimeStr;
    private Date endTime;
    private String endTimeStr;
    private Integer goOver;

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getPrefectureValue() {
        return prefectureValue;
    }

    public void setPrefectureValue(String prefectureValue) {
        this.prefectureValue = prefectureValue;
    }

    public String getStartTimeStr() {
        return startTimeStr;
    }

    public void setStartTimeStr(String startTimeStr) {
        this.startTimeStr = startTimeStr;
    }

    public String getEndTimeStr() {
        return endTimeStr;
    }

    public void setEndTimeStr(String endTimeStr) {
        this.endTimeStr = endTimeStr;
    }

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
