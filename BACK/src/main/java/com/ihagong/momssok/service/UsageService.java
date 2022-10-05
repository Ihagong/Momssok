package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.UsageMapper;
import com.ihagong.momssok.model.dto.PromiseItemDto;
import com.ihagong.momssok.model.dto.UsageApiDto;
import com.ihagong.momssok.model.dto.UsageDBDto;
import com.ihagong.momssok.model.dto.UsageItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UsageService {
    private final UsageMapper usageMapper;
    public Map<Boolean,Object> LastAccess(String name)  {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageDBDto dto = new UsageDBDto();
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
    public Map<Boolean,Object> Addtime(String name,Date startTime,Date endTime) throws IOException, ClassNotFoundException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageApiDto dto = new UsageApiDto();
        UsageDBDto dbDto=new UsageDBDto();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String CurrentDate = simpleDateFormat.format(new Date());
        long usageTime=(endTime.getTime()-startTime.getTime())/60000; //사용시간 분단위

        dbDto.setEmail_name(email+"_"+name);
        dbDto.setDate(CurrentDate);
        dto.setDate(CurrentDate);
        dto.setEmail_name(email+"_"+name);

        simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String startTimeString = simpleDateFormat.format(startTime);
        simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String endTimeString = simpleDateFormat.format(endTime);
        UsageItemDto usageItem = new UsageItemDto();
        usageItem.setUsageTime(usageTime);
        usageItem.setStartTime(startTimeString);
        usageItem.setEndtTime(endTimeString);
        usageItem.setDate(CurrentDate);



        if(usageMapper.checkUsageTimeExist(dbDto)==0){
            List<UsageItemDto> usageList=new ArrayList<>();
            usageList.add(usageItem);
            dto.setUsageTimesList(usageList);

            byte[] serializedItems;
            ByteArrayOutputStream baos= new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(usageList);
            serializedItems = baos.toByteArray();
            dbDto.setUsageTimesList(serializedItems);
            dbDto.setTotal_usage_time(usageTime);
            if(usageMapper.registUsageTime(dbDto)==1){
                resultBody.put("message", "등록 완료");
                result.put(true, resultBody);
                return result;
            }
        }
        else{
            UsageDBDto currentDbDto=usageMapper.searchUsageDBDto(dbDto);

            byte[] serializedItems = currentDbDto.getUsageTimesList();
            ByteArrayInputStream bais = new ByteArrayInputStream(serializedItems);
            ObjectInputStream ois = new ObjectInputStream(bais);
            Object objectItems = ois.readObject();
            List<UsageItemDto> items = (List<UsageItemDto>)objectItems;
            items.add(usageItem);
            long totalTime=0;
            for(UsageItemDto item:items){
                totalTime+=item.getUsageTime();
            }
            dbDto.setTotal_usage_time(totalTime);
            ByteArrayOutputStream baos= new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(items);
            serializedItems = baos.toByteArray();
            dbDto.setUsageTimesList(serializedItems);

            if(usageMapper.updateUsageTime(dbDto)==1){
                resultBody.put("message", "추가 완료");
                result.put(true, resultBody);
                return result;
            }
        }

        resultBody.put("message", "등록 실패");
        result.put(false, resultBody);
        return result;

    }


    public Map<Boolean,Object> AddtimeInDate(String name,Date date,Date startTime,Date endTime) throws IOException, ClassNotFoundException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageApiDto dto = new UsageApiDto();
        UsageDBDto dbDto=new UsageDBDto();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String CurrentDate = simpleDateFormat.format(date);
        long usageTime=(endTime.getTime()-startTime.getTime())/60000; //사용시간 분단위

        dbDto.setEmail_name(email+"_"+name);
        dbDto.setDate(CurrentDate);
        dto.setDate(CurrentDate);
        dto.setEmail_name(email+"_"+name);

        simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String startTimeString = simpleDateFormat.format(startTime);
        simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String endTimeString = simpleDateFormat.format(endTime);
        UsageItemDto usageItem = new UsageItemDto();
        usageItem.setUsageTime(usageTime);
        usageItem.setStartTime(startTimeString);
        usageItem.setEndtTime(endTimeString);
        usageItem.setDate(CurrentDate);



        if(usageMapper.checkUsageTimeExist(dbDto)==0){
            List<UsageItemDto> usageList=new ArrayList<>();
            usageList.add(usageItem);
            dto.setUsageTimesList(usageList);

            byte[] serializedItems;
            ByteArrayOutputStream baos= new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(usageList);
            serializedItems = baos.toByteArray();
            dbDto.setUsageTimesList(serializedItems);
            dbDto.setTotal_usage_time(usageTime);
            if(usageMapper.registUsageTime(dbDto)==1){
                resultBody.put("message", "등록 완료");
                result.put(true, resultBody);
                return result;
            }
        }
        else{
            UsageDBDto currentDbDto=usageMapper.searchUsageDBDto(dbDto);

            byte[] serializedItems = currentDbDto.getUsageTimesList();
            ByteArrayInputStream bais = new ByteArrayInputStream(serializedItems);
            ObjectInputStream ois = new ObjectInputStream(bais);
            Object objectItems = ois.readObject();
            List<UsageItemDto> items = (List<UsageItemDto>)objectItems;
            items.add(usageItem);
            long totalTime=0;
            for(UsageItemDto item:items){
                totalTime+=item.getUsageTime();
            }
            dbDto.setTotal_usage_time(totalTime);
            ByteArrayOutputStream baos= new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(items);
            serializedItems = baos.toByteArray();
            dbDto.setUsageTimesList(serializedItems);

            if(usageMapper.updateUsageTime(dbDto)==1){
                resultBody.put("message", "추가 완료");
                result.put(true, resultBody);
                return result;
            }
        }

        resultBody.put("message", "등록 실패");
        result.put(false, resultBody);
        return result;

    }
    public Map<Boolean,Object> lookupUsageTime(String name,Date date) throws IOException, ClassNotFoundException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageDBDto dbDto=new UsageDBDto();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String CurrentDate = simpleDateFormat.format(date);
        dbDto.setEmail_name(email+"_"+name);
        dbDto.setDate(CurrentDate);
        UsageDBDto currentDbDto=usageMapper.searchUsageDBDto(dbDto);

        if(currentDbDto!=null) {
            byte[] serializedItems = currentDbDto.getUsageTimesList();
            ByteArrayInputStream bais = new ByteArrayInputStream(serializedItems);
            ObjectInputStream ois = new ObjectInputStream(bais);
            Object objectItems = ois.readObject();
            List<UsageItemDto> items = (List<UsageItemDto>) objectItems;
            UsageApiDto apiDto=new UsageApiDto();
            apiDto.setEmail_name(currentDbDto.getEmail_name());
            apiDto.setTotal_usage_time(currentDbDto.getTotal_usage_time());
            apiDto.setDate(currentDbDto.getDate());
            apiDto.setUsageTimesList(items);
            resultBody.put("Usage",apiDto);
            result.put(true, resultBody);
            return result;
        }
        resultBody.put("message","조회 실패");
        result.put(false, resultBody);
        return result;



    }

}
