package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.DrawingApiDto;
import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.model.dto.DrawingOutDto;
import com.ihagong.momssok.model.dto.DrawingTagDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface DrawingMapper {
    List<DrawingDto> lookupAllDrawing(String email_name) throws SQLException;
    DrawingDto lookupDrawing(int drawing_id) throws SQLException;
    int saveDrawing(DrawingDto drawingDto) throws SQLException;
    int getImageId(String name) throws SQLException;
    int saveTag(DrawingTagDto tag) throws SQLException;
    int updateDrawing(DrawingApiDto drawing) throws SQLException;
    String getDrawing(int drawing_id) throws SQLException;
    int deleteDrawing(DrawingOutDto drawing) throws SQLException;
}
