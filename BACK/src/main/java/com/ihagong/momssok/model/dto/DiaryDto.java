package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaryDto {
    private int id;
    private int drawing_id;
    private String drawing_base64;
    private String title;
    private String content;
    private String weather;
    private String emotion;
    private String date;
    private int is_deleted_from_child;
}
