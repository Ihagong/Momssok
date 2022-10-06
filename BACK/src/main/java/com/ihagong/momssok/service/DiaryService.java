package com.ihagong.momssok.service;

import com.ihagong.momssok.model.dto.DiaryDayDto;
import com.ihagong.momssok.model.dto.DiaryDto;
import com.ihagong.momssok.model.dto.DiarySaveDto;

import java.util.List;

public interface DiaryService {

    List<DiaryDto> lookupCalender(DiaryDayDto diary) throws Exception;
    List<DiaryDto> lookupGallery(DiaryDayDto diary) throws Exception;
    List<DiaryDto> searchDiary(String option) throws Exception;
    int saveDiary(DiarySaveDto diary) throws Exception;

    int searchDiaryExist(DiarySaveDto diary);
    int getId(String email_name) throws Exception;
    DiaryDto lookupDiary(int id) throws Exception;
    int updateDiary(DiarySaveDto diary) throws Exception;
    int deleteDiary(DiarySaveDto diary) throws Exception;

    DiaryDto searchDiaryByDate(DiarySaveDto diary);
}
