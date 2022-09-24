package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PromiseItemDto implements Serializable {
    private String promiseName;
    private String promiseDetail;
    private int promiseCurrentStep;
    private int promiseTotalStep;
    private boolean completed;
    private String gift;
}
