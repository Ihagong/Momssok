package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class LetterDto {
    private int letter_id;
    private String send_from;
    private String send_to;
    private String title;
    private String content;
    private String video_path;
    private Date date;
    private int read_check;
}
