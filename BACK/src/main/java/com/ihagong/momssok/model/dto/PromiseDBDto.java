package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PromiseDBDto {
    private int promise_id;
    private String email_name;
    private byte[] promise_list;
    private String gift; //사용안함
    private boolean promise_completed;//사용안함
    private boolean gift_completed;//사용안함
}
