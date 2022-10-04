package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReportInputDto {
    private String name;
    private String date;
    private String email_name;
    private String startDate;
    private String finishDate;
}
