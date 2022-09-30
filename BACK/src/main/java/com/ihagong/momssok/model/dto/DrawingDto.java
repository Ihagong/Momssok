package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DrawingDto {
    private int drawing_id;
    private String email_name;
    private String drawing_base64;
    private String image_path;
    private String name;
    private String tag;
    private String created_date;
    private String modified_date;

}
