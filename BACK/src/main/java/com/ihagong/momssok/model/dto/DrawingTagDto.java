package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DrawingTagDto {
    private int drawing_id;
    private String email_name;
    private String tag;
}
