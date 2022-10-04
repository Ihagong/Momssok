package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.ReportDto;
import com.ihagong.momssok.model.dto.ReportInputDto;
import com.ihagong.momssok.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

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

            //현재 날짜 기준 시작과 끝(일요일, 토요일) 값 구하기
            String date = reportInput.getDate();
            String pattern = "yyyy-MM-dd";
            Date date1 = new SimpleDateFormat(pattern).parse(date);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date1);  //calendar 구조에 오늘 날짜를 저장

            calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
            String startDate = simpleDateFormat.format(calendar.getTime());  //출력 형식 지정
            System.out.println(startDate);  //시작하는 일요일 날짜 출력

            calendar.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
            String finishDate = simpleDateFormat.format(calendar.getTime());
            System.out.println(finishDate);  //끝나는 토요일 날짜 출력

            reportInput.setStartDate(startDate);
            reportInput.setFinishDate(finishDate);
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
