package com.ihagong.momssok.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
public class emotionDto {
    private Map<String, Object> percent;
    private Map<String, Object> score;
    private Map<String, Object> emotionsMap;
    private String emotion;
    private String emotion_all;
    private int id;
}
