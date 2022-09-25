package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.service.DiaryService;
import com.ihagong.momssok.service.DrawingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DiaryController {

    private final String success = "SUCCESS";
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final DiaryService diaryService;
    private final DrawingService drawingService;

    @GetMapping("/searchDrawing")
    public Map<String, Object> lookupAllDrawing(@RequestParam String email_name){   //Param에 email과 name을 다 보내주는게 맞나?
        Map<String, Object> result = new HashMap<>();
        List<DrawingDto> drawingList = new ArrayList<>();

        try {
            drawingList = drawingService.lookupAllDrawing(email_name);

            if(drawingList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", drawingList);
        return result;
    }

    @GetMapping("/detailDrawing/{drawing_id}")
    public Map<String, Object> lookupDrawing(@PathVariable int drawing_id){
        Map<String, Object> result = new HashMap<>();

        DrawingDto drawing;
        try {
            drawing = drawingService.lookupDrawing(drawing_id);
            if(drawing != null){
                result.put("statue", success);
                result.put("data", drawing);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }
}
