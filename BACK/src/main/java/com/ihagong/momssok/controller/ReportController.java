package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.ReportDto;
import com.ihagong.momssok.model.dto.ReportInputDto;
import com.ihagong.momssok.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/parents")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReportController {

    private final String success = "SUCCESS";
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final ReportService reportService;

    @PostMapping("/daily")
    public Map<String, Object> dailyEmotion(@RequestBody ReportInputDto reportInput){
        Map<String, Object> result = new HashMap<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = reportInput.getName();
            String email_name = email + "_" + name;
            reportInput.setEmail_name(email_name);

            ReportDto emotion = reportService.lookupDaily(reportInput);

            if(emotion != null){
                result.put("statue", success);
                result.put("data", emotion);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }


    @PostMapping("/weekly")
    public Map<String, Object> weeklyEmotion(@RequestBody ReportInputDto reportInput){
        Map<String, Object> result = new HashMap<>();
        List<ReportDto> reportList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = reportInput.getName();
            String email_name = email + "_" + name;
            reportInput.setEmail_name(email_name);

            reportList = reportService.lookupWeekly(reportInput);

            if(reportList != null){
                result.put("statue", success);
                result.put("data", reportList);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }


    @GetMapping("/montly")
    public Map<String, Object> montlyEmotion(@RequestBody ReportInputDto reportInput){

        Map<String, Object> result = new HashMap<>();
        List<ReportDto> reportList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = reportInput.getName();
            String email_name = email + "_" + name;
            reportInput.setEmail_name(email_name);

            reportList = reportService.lookupMontly(reportInput);

            if(reportList != null){
                result.put("statue", success);
                result.put("data", reportList);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }


//    @GetMapping("/word")
//    public Map<String, Object> wordCloud(@RequestParam int drawing_id){
//        Map<String, Object> result = new HashMap<>();
//
//        try {
//            DrawingDto drawing = reportService.lookupDrawing(drawing_id);
//
//            String painting = reportService.getDrawing(drawing_id);  //이미지를 가져온다
//
//            byte[] file = FileUtils.readFileToByteArray(new File(painting));  //bytearray로 변환
//            String base64 = "date:image/png;base64," + Base64.getEncoder().encodeToString(file);  //base64로 인코딩
//            drawing.setDrawing_base64(base64);
//
//            if(drawing != null){
//                result.put("statue", success);
//                result.put("data", drawing);
//            }else{
//                result.put("status", fail);
//            }
//        } catch (Exception e) {
//            result.put("status", error);
//            result.put("message", e.toString());
//        }
//
//        return result;
//    }
}
