package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaryDto {
    private int id;
    private String title;
    private String content;
    private String weather;
    private String emotion;
    private String date;
    private String tag;
    private int is_temporary_save;
    private int is_deleted_from_child;
}
