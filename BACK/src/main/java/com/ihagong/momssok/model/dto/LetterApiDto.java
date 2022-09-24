package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.ByteArrayResource;

import java.util.Date;

@Getter
@Setter
public class LetterApiDto {
    private String send_from;
    private String send_to;
    private String title;
    private String content;
    private Date date;
}
