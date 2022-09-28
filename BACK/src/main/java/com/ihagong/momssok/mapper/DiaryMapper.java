package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.DiaryDayDto;
import com.ihagong.momssok.model.dto.DiaryDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface DiaryMapper {
    List<DiaryDto> lookupCalender(DiaryDayDto diary) throws SQLException;
    List<DiaryDto> lookupGallery(String email_name) throws SQLException;
}
