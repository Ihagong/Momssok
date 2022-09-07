package com.example.PaintingDiary.service;

import com.example.PaintingDiary.mapper.DiaryMapper;
import com.example.PaintingDiary.model.dto.DiaryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService{

    private final DiaryMapper diaryMapper;

    @Override
    public int saveDiary(String painting) throws Exception {
        return diaryMapper.saveDiary(painting);
    }

    @Override
    public DiaryDto getDiary(DiaryDto diaryDto) throws Exception {
        return diaryMapper.getDiary(diaryDto);
    }
}
