package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiarySaveDto {
    private int id;
    private String name;
    private int drawing_id;
    private String title;
    private String content;
    private String weather;
    private String emotion;
    private String date;
    private String email_name;
}
