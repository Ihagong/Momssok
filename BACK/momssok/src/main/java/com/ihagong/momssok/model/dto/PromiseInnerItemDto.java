package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PromiseInnerItemDto  implements Serializable{
    private int id;
    private String todo;
    private int done;
}
