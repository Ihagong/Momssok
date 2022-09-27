package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.DrawingDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface DrawingMapper {
    List<DrawingDto> lookupAllDrawing(String email_name) throws SQLException;
    DrawingDto lookupDrawing(int drawing_id) throws SQLException;
}
