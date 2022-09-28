package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DrawingInputDto {
    private int drawing_id;
    private String drawing_base64;
}
