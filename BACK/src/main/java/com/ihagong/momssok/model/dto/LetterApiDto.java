package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LetterApiDto {
    private int letter_id;
    private String author;
    private String receiver;
    private String title;
    private String content;
    private Date date;
    private int check;
}
