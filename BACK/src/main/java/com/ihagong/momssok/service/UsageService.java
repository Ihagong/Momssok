package com.ihagong.momssok.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ihagong.momssok.mapper.UsageMapper;
import com.ihagong.momssok.model.dto.EmotionSaveDto;
import com.ihagong.momssok.model.dto.UsageDto;
import com.ihagong.momssok.model.dto.testImageDto;
import com.ihagong.momssok.util.BASE64DecodedMultipartFile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UsageService {
    private final UsageMapper usageMapper;
    public Map<Boolean,Object> LastAccess(String name)  {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageDto dto = new UsageDto();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String StringDate = simpleDateFormat.format(new Date());
        dto.setDate(StringDate);
        dto.setEmail_name(email+"_"+name);
        if(usageMapper.updateLastAccess(dto)==1)
        {
            resultBody.put("message", "저장 완료");
            result.put(true, resultBody);
            return result;
        }
        else{
            resultBody.put("message", "저장 실패");
            result.put(false, resultBody);
            return result;
        }


    }
    public Map<Boolean,Object> Addtime(String name,int time)  {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageDto dto = new UsageDto();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String StringDate = simpleDateFormat.format(new Date());
        dto.setDate(StringDate);
        dto.setEmail_name(email+"_"+name);
        System.out.println(dto.getDate());
        System.out.println(dto.getEmail_name());
        if(usageMapper.checkUsageTimeExist(dto)==0){
            System.out.println(11);
            dto.setUsage_time(time);
            if(usageMapper.registUsageTime(dto)==1){
                resultBody.put("message", "등록 완료");
                result.put(true, resultBody);
                return result;
            }
        }
        else{
            int current_time=usageMapper.searchUsageTime(dto);
            dto.setUsage_time(time+current_time);
            if(usageMapper.updateUsageTime(dto)==1){
                resultBody.put("message", "등록 완료");
                result.put(true, resultBody);
                return result;
            }
        }
        resultBody.put("message", "등록 실패");
        result.put(false, resultBody);
        return result;

    }


    public Map<Boolean,Object> AddtimeInDate(String name,int time,Date date)  {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageDto dto = new UsageDto();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String StringDate = simpleDateFormat.format(date);
        dto.setDate(StringDate);
        dto.setEmail_name(email+"_"+name);

        if(usageMapper.checkUsageTimeExist(dto)==0){
            dto.setUsage_time(time);
            if(usageMapper.registUsageTime(dto)==1){
                resultBody.put("message", "등록 완료");
                result.put(true, resultBody);
                return result;
            }
        }
        else{
            int current_time=usageMapper.searchUsageTime(dto);
            dto.setUsage_time(time+current_time);
            if(usageMapper.updateUsageTime(dto)==1){
                resultBody.put("message", "등록 완료");
                result.put(true, resultBody);
                return result;
            }
        }
        resultBody.put("message", "등록 실패");
        result.put(false, resultBody);
        return result;

    }
    public Map<Boolean,Object> lookupUsageTime(String name,Date date)  {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageDto dto = new UsageDto();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String StringDate = simpleDateFormat.format(date);
        dto.setDate(StringDate);
        dto.setEmail_name(email+"_"+name);
        if(usageMapper.checkUsageTimeExist(dto)==0){
            resultBody.put("message","조회 실패");
            result.put(false, resultBody);
            return result;
        }
        int time=usageMapper.searchUsageTime(dto);
        resultBody.put("Date",StringDate);
        resultBody.put("UsageTime",time);
        result.put(true, resultBody);
        return result;



    }

}
