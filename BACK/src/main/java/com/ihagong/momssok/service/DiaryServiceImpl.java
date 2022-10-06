package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.DiaryMapper;
import com.ihagong.momssok.mapper.DrawingMapper;
import com.ihagong.momssok.model.dto.DiaryDayDto;
import com.ihagong.momssok.model.dto.DiaryDto;
import com.ihagong.momssok.model.dto.DiarySaveDto;
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
    public List<DiaryDto> lookupGallery(DiaryDayDto diary) throws Exception {
        return diaryMapper.lookupGallery(diary);
    }

    @Override
    public List<DiaryDto> searchDiary(String option) throws Exception {
        return diaryMapper.searchDiary(option);
    }

    @Override
    public int saveDiary(DiarySaveDto diary) throws Exception {
        return diaryMapper.saveDiary(diary);
    }

    @Override
    public int getId(String email_name) throws Exception {
        return diaryMapper.getId(email_name);
    }

    @Override
    public DiaryDto lookupDiary(int id) throws Exception {
        return diaryMapper.lookupDiary(id);
    }
    @Override
    public int searchDiaryExist(DiarySaveDto diary)  {
        return diaryMapper.searchDiaryExist(diary);
    }

    @Override
    public DiaryDto searchDiaryByDate(DiarySaveDto diary)  {
        return diaryMapper.searchDiaryByDate(diary);
    }
    @Override
    public int updateDiary(DiarySaveDto diary) throws Exception {
        return diaryMapper.updateDiary(diary);
    }

    @Override
    public int deleteDiary(DiarySaveDto diary) throws Exception {
        return diaryMapper.deleteDiary(diary);
    }

}
