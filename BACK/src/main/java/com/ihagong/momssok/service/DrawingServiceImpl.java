package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.DrawingMapper;
import com.ihagong.momssok.model.dto.DrawingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrawingServiceImpl implements DrawingService{

    private final DrawingMapper drawingMapper;

    @Override
    public List<DrawingDto> lookupAllDrawing(String email_name) throws Exception {
        return drawingMapper.lookupAllDrawing(email_name);
    }

    @Override
    public DrawingDto lookupDrawing(int drawing_id) throws Exception {
        return drawingMapper.lookupDrawing(drawing_id);
    }

    @Override
    public int deleteDrawing(String email) throws Exception {
        return drawingMapper.deleteDrawing(email);
    }
}
