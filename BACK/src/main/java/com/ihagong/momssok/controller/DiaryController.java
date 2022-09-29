package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.DiaryDayDto;
import com.ihagong.momssok.model.dto.DiaryDto;
import com.ihagong.momssok.model.dto.DiarySaveDto;
import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @GetMapping("/searchDiaryCalendar")
    public Map<String, Object> lookupDiaryCalender(  //'2022-09-21 05:29:35' 년월이 일치하는 일기의 emotion을 모두 가져온다
            @RequestBody DiaryDayDto diary){  //date("2022-09"), name을 받는다
        Map<String, Object> result = new HashMap<>();
        List<DiaryDto> diaryList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = diary.getName();
            String email_name = email + "_" + name;
            diary.setEmail_name(email_name);

            diaryList = diaryService.lookupCalender(diary);

            if(diaryList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", diaryList);
        return result;

    }

    @GetMapping("/searchDiaryGallery")
    public Map<String, Object> lookupDiaryGallery(@RequestParam String name){  //최신순, 오래된 순 처리?
        Map<String, Object> result = new HashMap<>();
        List<DiaryDto> diaryList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String email_name = email + "_" + name;

            diaryList = diaryService.lookupGallery(email_name);

            if(diaryList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", diaryList);
        return result;

    }

    @GetMapping("/searchDiary/{option}")
    public Map<String, Object> searchDiary(@PathVariable String option){
        Map<String, Object> result = new HashMap<>();
        List<DiaryDto> diaryList = new ArrayList<>();

        try {
            diaryList = diaryService.searchDiary(option);
            if(diaryList != null){
                result.put("status", success);
                result.put("data", diaryList);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PostMapping("/saveDiary")
    public Map<String, Object> saveDiary(@RequestBody DiarySaveDto diary){
        Map<String, Object> result = new HashMap<>();

        try{
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = diary.getName();
            String email_name = email + "_" + name;
            diary.setEmail_name(email_name);
            int res = diaryService.saveDiary(diary);
            if(res == 1) {
                result.put("status", success);
                result.put("data", diary);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @GetMapping("/detailDiary")
    public Map<String, Object> lookupDiary(@RequestParam int id){
        Map<String, Object> result = new HashMap<>();

        try {
            DiaryDto diary = diaryService.lookupDiary(id);
            if(diary != null){
                result.put("statue", success);
                result.put("data", diary);
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
