package com.ihagong.momssok.service;

import com.ihagong.momssok.model.dto.DrawingApiDto;
import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.model.dto.DrawingOutDto;

import java.util.List;

public interface DrawingService {
    List<DrawingDto> lookupAllDrawing(String email_name) throws Exception;
    DrawingDto lookupDrawing(int drawing_id) throws Exception;
    int saveDrawing(DrawingDto drawingDto) throws Exception;
    int getImageId(String name) throws Exception;
    int updateDrawing(DrawingApiDto drawing) throws Exception;
    String getDrawing(int drawing_id) throws Exception;
    int deleteDrawing(DrawingOutDto drawing) throws Exception;
}
