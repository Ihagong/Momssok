package com.example.PaintingDiary.service;

import com.example.PaintingDiary.model.dto.DiaryDto;

public interface DiaryService {

    int saveDiary(String painting) throws Exception;
    String getDiary(int id) throws Exception;
}
