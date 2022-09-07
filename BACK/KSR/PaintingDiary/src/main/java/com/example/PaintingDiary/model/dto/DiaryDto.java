package com.example.PaintingDiary.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaryDto {

    private int diary_id;
    private String painting;
    private String content;
}
