package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.DiaryDayDto;
import com.ihagong.momssok.model.dto.DiaryDto;
import com.ihagong.momssok.model.dto.DiarySaveDto;
import com.ihagong.momssok.model.dto.emotionDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface DiaryMapper {
    List<DiaryDto> lookupCalender(DiaryDayDto diary) throws SQLException;
    List<DiaryDto> lookupGallery(DiaryDayDto diary) throws SQLException;
    List<DiaryDto> searchDiary(String option) throws SQLException;
    int saveDiary(DiarySaveDto diary) throws SQLException;
    int getId(String email_name) throws SQLException;
    int saveEmotion(emotionDto dto) throws SQLException;
    DiaryDto lookupDiary(int id) throws SQLException;
    int updateDiary(DiarySaveDto diary) throws SQLException;
    int deleteDiary(DiarySaveDto diary) throws SQLException;

    int searchDiaryExist(DiarySaveDto diary);

    DiaryDto searchDiaryByDate(DiarySaveDto diary);
}
