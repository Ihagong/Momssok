package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PromiseInputItemDto {
    private String promiseName;
    private String promiseDetail;
    private int promiseStep;
    private String gift;
}
