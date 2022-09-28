package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DrawingApiDto {
    private String drawing_base64;
    private String name;
    private String email_name;
}
