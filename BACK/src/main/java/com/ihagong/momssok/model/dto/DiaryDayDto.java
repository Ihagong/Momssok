package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaryDayDto {
    private String date;
    private String name;
    private String email_name;
}
