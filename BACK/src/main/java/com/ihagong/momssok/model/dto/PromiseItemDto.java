package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class PromiseItemDto implements Serializable {
    private int id;
    private List<PromiseInnerItemDto> todoList;
    private int done;
    private String gift;
}
