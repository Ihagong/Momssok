package com.example.PaintingDiary.mapper;

import com.example.PaintingDiary.model.dto.DiaryDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface DiaryMapper {
    int saveDiary(DiaryDto diary) throws SQLException;
    DiaryDto getDiary(DiaryDto diaryDto) throws SQLException;
}
