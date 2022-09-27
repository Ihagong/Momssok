package com.ihagong.momssok.service;

import com.ihagong.momssok.model.dto.DrawingDto;

import java.util.List;

public interface DrawingService {
    List<DrawingDto> lookupAllDrawing(String email_name) throws Exception;
    DrawingDto lookupDrawing(int drawing_id) throws Exception;
    int deleteDrawing(String email) throws Exception;
}
