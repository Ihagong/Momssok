package com.example.PaintingDiary.mapper;

import com.example.PaintingDiary.model.dto.DiaryDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface DiaryMapper {
    int saveDiary(String painting) throws SQLException;
    String getDiary(int id) throws SQLException;
}
