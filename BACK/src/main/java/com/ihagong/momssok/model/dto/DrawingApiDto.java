package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DrawingApiDto {
    private int drawing_id;
    private String drawing_base64;
    private String image_path;
    private String name;
    private String email_name;
}
