package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PromiseDBDto {
    private int promise_id;
    private String email_name;
    private byte[] promise_list;
    private String gift;
    private boolean promise_completed;
    private boolean gift_completed;
}
