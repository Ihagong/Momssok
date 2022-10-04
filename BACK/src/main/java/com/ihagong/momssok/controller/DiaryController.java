package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.*;
import com.ihagong.momssok.service.DiaryService;
import com.ihagong.momssok.service.TestService;
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
    private final TestService testService;

    @PostMapping("/searchDiaryCalendar")
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

    @PostMapping("/searchDiaryGallery")
    public Map<String, Object> lookupDiaryGallery(@RequestBody DiaryDayDto diary){
        Map<String, Object> result = new HashMap<>();
        List<DiaryDto> diaryList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String email_name = email + "_" + diary.getName();

            diary.setEmail_name(email_name);
            diaryList = diaryService.lookupGallery(diary);

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

//    @GetMapping("/searchDiary/{option}")
//    public Map<String, Object> searchDiary(@PathVariable String option){
//        Map<String, Object> result = new HashMap<>();
//        List<DiaryDto> diaryList = new ArrayList<>();
//
//        try {
//            diaryList = diaryService.searchDiary(option);
//            if(diaryList != null){
//                result.put("status", success);
//                result.put("data", diaryList);
//            }else{
//                result.put("status", fail);
//            }
//        } catch (Exception e) {
//            result.put("status", error);
//            result.put("message", e.toString());
//        }
//        return result;
//    }

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
                int diary_id = diaryService.getId(email_name);
                EmotionSaveDto saveDto = new EmotionSaveDto();
                saveDto.setDiary_id(diary_id);
                saveDto.setContent(diary.getContent());
                testService.ApiTestEmotion(saveDto);
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

    @PutMapping("/updateDiary")
    public Map<String, Object> updateDiary(@RequestBody DiarySaveDto diary){
        Map<String, Object> result = new HashMap<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String name = diary.getName();
            String email_name = email + "_" + name;
            diary.setEmail_name(email_name);
            int res = diaryService.updateDiary(diary);
            if(res == 1) {
                result.put("status", success);
                result.put("data", diaryService.lookupDiary(diary.getId()));
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PutMapping("/deleteDiary")
    public Map<String, Object> deleteDiary(@RequestBody DiarySaveDto diary){  //아이페이지에서만 삭제 가능

        Map<String, Object> result = new HashMap<>();

        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            String name = diary.getName();
            String email_name = email + "_" + name;
            diary.setEmail_name(email_name);
            int res = diaryService.deleteDiary(diary);  //삭제하려는 사용자가 현재 사용자와 일치하면 삭제
            if(res == 1){
                result.put("status", success);
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
