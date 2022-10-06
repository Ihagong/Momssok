package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.model.dto.ReportDto;
import com.ihagong.momssok.model.dto.ReportInputDto;
import com.ihagong.momssok.service.DrawingService;
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
    private final DrawingService drawingService;


    public Map<String,Float> emotionPercent(List<ReportDto> reportListAll){
        Map<String,Float> emotion_avg_percent=new HashMap<>();
        for(ReportDto dto:reportListAll){
            String emotionAll=dto.getEmotion_all();
            String[] emotions=emotionAll.split(", ");
            for(String emotion:emotions){
                String[] emotion_percent=emotion.split(":");
                System.out.println(emotion_percent[0]);
                System.out.println(emotion_percent[1]);
                if(emotion_avg_percent.containsKey(emotion_percent[0])){
                    emotion_avg_percent.put(emotion_percent[0],emotion_avg_percent.get(emotion_percent[0])+Float.parseFloat(emotion_percent[1]));
                }
                else{
                    emotion_avg_percent.put(emotion_percent[0],Float.parseFloat(emotion_percent[1]));
                }
            }

        }
        int sum=0;
        for(String emotion: emotion_avg_percent.keySet()){
            sum+=emotion_avg_percent.get(emotion);
        }
        for(String emotion: emotion_avg_percent.keySet()){
            emotion_avg_percent.put(emotion, (float) Math.round(((emotion_avg_percent.get(emotion)/sum*10000)))/100);
        }
        return emotion_avg_percent;
    }
    @PostMapping("/daily")
    public Map<String, Object> dailyEmotion(@RequestBody ReportInputDto reportInput){
        Map<String, Object> result = new HashMap<>();
        List<ReportDto> reportListAll;
        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = reportInput.getName();
            String email_name = email + "_" + name;
            reportInput.setEmail_name(email_name);
            reportListAll = reportService.lookupAll(reportInput);

            Map<String,Float> emotion_avg_percent=emotionPercent(reportListAll);
            ReportDto emotion = reportService.lookupDaily(reportInput);
            System.out.println(reportInput);
            System.out.println(emotion_avg_percent);
            System.out.println(emotion);
            if(emotion != null){
                result.put("statue", success);
                result.put("today", emotion);
                result.put("avg", emotion_avg_percent);
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
        List<ReportDto> reportListAll;

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = reportInput.getName();
            String email_name = email + "_" + name;
            reportInput.setEmail_name(email_name);
            reportListAll = reportService.lookupAll(reportInput);
            Map<String,Float> emotion_avg_percent=emotionPercent(reportListAll);
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
            for(String emotion:emotion_avg_percent.keySet()){
                emotion_avg_percent.put(emotion,emotion_avg_percent.get(emotion)*7/100);
            }

            if(reportList != null){
                result.put("statue", success);
                result.put("week", reportList);
                result.put("avg", emotion_avg_percent);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }


    @PostMapping("/monthly")
    public Map<String, Object> monthlyEmotion(@RequestBody ReportInputDto reportInput){

        Map<String, Object> result = new HashMap<>();
        List<ReportDto> reportList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = reportInput.getName();
            String email_name = email + "_" + name;
            reportInput.setEmail_name(email_name);

            reportList = reportService.lookupMonthly(reportInput);
            Map<String,Float> emotion_avg_percent=emotionPercent(reportList);
            if(reportList != null){
                result.put("statue", success);
                result.put("month", emotion_avg_percent);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }


    @GetMapping("/word")
    public Map<String, Object> wordCloud(@RequestParam String name){
        Map<String, Object> result = new HashMap<>();
        List<DrawingDto> drawingList = new ArrayList<>();
        StringBuffer tag = new StringBuffer();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String email_name = email + "_" + name;

            drawingList = drawingService.lookupAllDrawing(email_name);

            if(drawingList != null){

                for(DrawingDto drawing:drawingList){
                    String t = drawing.getTag();
                    tag.append(t);
                }

                result.put("statue", success);
                result.put("data", tag.toString());
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
