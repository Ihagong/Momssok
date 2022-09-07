package com.example.PaintingDiary.service;

import com.example.PaintingDiary.model.dto.DiaryDto;

public interface DiaryService {

    int saveDiary(DiaryDto diary) throws Exception;
    DiaryDto getDiary(DiaryDto diaryDto) throws Exception;
}
