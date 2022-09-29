package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.DiaryMapper;
import com.ihagong.momssok.mapper.DrawingMapper;
import com.ihagong.momssok.model.dto.DiaryDayDto;
import com.ihagong.momssok.model.dto.DiaryDto;
import com.ihagong.momssok.model.dto.DrawingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService{

    private final DiaryMapper diaryMapper;

    @Override
    public List<DiaryDto> lookupCalender(DiaryDayDto diary) throws Exception {
        return diaryMapper.lookupCalender(diary);
    }

    @Override
    public List<DiaryDto> lookupGallery(String email_name) throws Exception {
        return diaryMapper.lookupGallery(email_name);
    }

    public List<DiaryDto> searchDiary(String option) throws Exception {
        return diaryMapper.searchDiary(option);
    }

}
