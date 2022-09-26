package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.PromiseMapper;
import com.ihagong.momssok.model.dto.PromiseDBDto;
import com.ihagong.momssok.model.dto.PromiseInputDto;
import com.ihagong.momssok.model.dto.PromiseInputItemDto;
import com.ihagong.momssok.model.dto.PromiseItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PromiseService {
    private final PromiseMapper promiseMapper;
    public Map<Boolean,Object> savePromise(PromiseInputDto promise) throws IOException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        List<PromiseItemDto> items=new ArrayList<>();
        for(PromiseInputItemDto item:promise.getPromiseItems()){
            PromiseItemDto pitem=new PromiseItemDto();
            pitem.setCompleted(false);
            pitem.setPromiseName(item.getPromiseName());
            pitem.setPromiseDetail(item.getPromiseDetail());
            pitem.setGift(item.getGift());
            pitem.setPromiseTotalStep(item.getPromiseStep());
            pitem.setPromiseCurrentStep(0);
            items.add(pitem);
        }

        PromiseDBDto dto = new PromiseDBDto();
        dto.setEmail_name(email+"_"+promise.getName());
        byte[] serializedItems;
        ByteArrayOutputStream baos= new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(items);
        serializedItems = baos.toByteArray();
        dto.setPromise_list(serializedItems);
        dto.setPromise_completed(false);
        dto.setGift_completed(false);
        if(promiseMapper.checkPromise(email+"_"+promise.getName())>=1){
            resultBody.put("message", "이미 진행 중인 약속 로드맵이 있습니다.");
            result.put(false, resultBody);
            return result;
        }
        if(promiseMapper.savePromise(dto)==1){
            resultBody.put("message", "약속 저장 완료");
            result.put(true, resultBody);
            return result;
        }
        else{
            resultBody.put("message", "약속 저장 실패");
            result.put(false, resultBody);
            return result;
        }

    }

    public Map<Boolean,Object> lookupAllPromise(String name) throws IOException, ClassNotFoundException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();

        PromiseDBDto promise = promiseMapper.selectPromise(email+"_"+name);
        if(promise==null){
            resultBody.put("message", "진행중인 약속이 없습니다.");
            result.put(false, resultBody);
            return result;
        }
        byte[] serializedItems = promise.getPromise_list();
        ByteArrayInputStream bais = new ByteArrayInputStream(serializedItems);
        ObjectInputStream ois = new ObjectInputStream(bais);
        Object objectItems = ois.readObject();
        List<PromiseItemDto> items = (List<PromiseItemDto>)objectItems;

        resultBody.put("promiseItems", items);
        result.put(true, resultBody);
        return result;
    }
    public Map<Boolean,Object> updatePromise(String name) throws IOException, ClassNotFoundException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();

        PromiseDBDto promise = promiseMapper.selectPromise(email+"_"+name);
        if(promise==null){
            resultBody.put("message", "진행중인 약속이 없습니다.");
            result.put(false, resultBody);
            return result;
        }
        byte[] serializedItems = promise.getPromise_list();
        ByteArrayInputStream bais = new ByteArrayInputStream(serializedItems);
        ObjectInputStream ois = new ObjectInputStream(bais);
        Object objectItems = ois.readObject();
        List<PromiseItemDto> items = (List<PromiseItemDto>)objectItems;

        resultBody.put("promiseItems", items);

        for(PromiseItemDto item:items){
            if(item.getPromiseCurrentStep()==item.getPromiseTotalStep())
                continue;
            item.setPromiseCurrentStep(item.getPromiseCurrentStep()+1);
            if(item.getPromiseCurrentStep()==item.getPromiseTotalStep()){
                item.setCompleted(true);
            }
            break;
        }
        boolean completed=true;
        for(PromiseItemDto item:items){
            if(item.isCompleted()==false){
                completed=false;
                break;
            }
        }
        promise.setPromise_completed(completed);
        ByteArrayOutputStream baos= new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(items);
        serializedItems = baos.toByteArray();
        promise.setPromise_list(serializedItems);
        promiseMapper.updatePromise(promise);
        if(!completed){
            resultBody.put("promiseItems", items);
            result.put(true, resultBody);
            return result;
        }
        else{
            resultBody.put("promiseItems", items);
            resultBody.put("messege", "약속 모두 완료");
            result.put(true, resultBody);
            return result;
        }

    }

}
