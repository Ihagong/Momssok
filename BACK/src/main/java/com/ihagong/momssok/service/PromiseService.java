package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.PromiseMapper;
import com.ihagong.momssok.model.dto.*;
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
        if(promise.getPromiseItems()==null){
            resultBody.put("message", "promiseItems 입력 오류");
            result.put(false, resultBody);
            return result;
        }
        if(promiseMapper.selectPromise(email+"_"+promise.getName())!=null){
            promiseMapper.deletePromise(email+"_"+promise.getName());
        }

        int index=1;
        for(PromiseItemDto item:promise.getPromiseItems()){
            item.setDone(0);
            item.setId(index++);
            int innerIndex=1;
            for(PromiseInnerItemDto inner:item.getTodoList()){
                //System.out.println(inner.getTodo());
                inner.setDone(0);
                inner.setId(innerIndex++);
            }
        }
        PromiseDBDto dto = new PromiseDBDto();
        dto.setEmail_name(email+"_"+promise.getName());
        byte[] serializedItems;
        ByteArrayOutputStream baos= new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(promise.getPromiseItems());
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
    public Map<Boolean,Object> savePromise2(String name,List<PromiseInputItemDto> items) throws IOException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        if(promiseMapper.selectPromise(email+"_"+name)!=null){
            promiseMapper.deletePromise(email+"_"+name);
        }
        List<PromiseItemDto> promiseItems = new ArrayList<>();
        for(PromiseInputItemDto item:items){

                boolean exist=false;
                for(PromiseItemDto dto:promiseItems){
                    if(dto.getId()==Integer.parseInt(item.getIndex1())){
                        PromiseInnerItemDto inner=new PromiseInnerItemDto();
                        inner.setId(Integer.parseInt(item.getIndex2()));
                        inner.setTodo(item.getTodo());
                        inner.setDone(0);
                        dto.getTodoList().add(inner);
                        exist=true;
                        break;
                    }

                }
                if(exist==false){
                    PromiseItemDto promiseItem=new PromiseItemDto();
                    promiseItem.setId(Integer.parseInt(item.getIndex1()));
                    List<PromiseInnerItemDto> todoList = new ArrayList<>();
                    PromiseInnerItemDto inner=new PromiseInnerItemDto();
                    inner.setId(Integer.parseInt(item.getIndex2()));
                    inner.setTodo(item.getTodo());
                    inner.setDone(0);
                    todoList.add(inner);
                    promiseItem.setTodoList(todoList);
                    promiseItem.setGift(item.getGift());
                    promiseItem.setDone(0);
                    promiseItems.add(promiseItem);
                }

        }





        PromiseDBDto dto = new PromiseDBDto();
        dto.setEmail_name(email+"_"+name);
        byte[] serializedItems;
        ByteArrayOutputStream baos= new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(promiseItems);
        serializedItems = baos.toByteArray();
        dto.setPromise_list(serializedItems);
        dto.setPromise_completed(false);
        dto.setGift_completed(false);
        if(promiseMapper.checkPromise(email+"_"+name)>=1){
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
    public Map<Boolean,Object> updatePromise(String name,String index,String new_todo,String gift) throws IOException, ClassNotFoundException {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        String index2[]=index.split("-");

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

            boolean updated=false;
            loop:for(PromiseItemDto item:items){
                for(PromiseInnerItemDto inner:item.getTodoList()){
                    if(item.getId()==Integer.parseInt(index2[0])&&inner.getId()==Integer.parseInt(index2[1])){
                        inner.setTodo(new_todo);
                        if(gift!=null){
                            item.setGift(gift);
                        }
                        updated=true;
                        break loop;
                    }
                }
            }
        if(updated==false){
                boolean exist=false;
                for(PromiseItemDto dto:items){
                    if(dto.getId()==Integer.parseInt(index2[0])){
                        PromiseInnerItemDto inner=new PromiseInnerItemDto();
                        inner.setId(Integer.parseInt(index2[1]));
                        inner.setTodo(new_todo);
                        inner.setDone(0);
                        if(gift!=null) {
                            dto.setGift(gift);
                        }
                        dto.getTodoList().add(inner);
                        exist=true;
                        updated=true;
                        break;
                    }

                }
                if(exist==false){
                    PromiseItemDto promiseItem=new PromiseItemDto();
                    promiseItem.setId(Integer.parseInt(index2[0]));
                    List<PromiseInnerItemDto> todoList = new ArrayList<>();
                    PromiseInnerItemDto inner=new PromiseInnerItemDto();
                    inner.setId(Integer.parseInt(index2[1]));
                    inner.setTodo(new_todo);
                    inner.setDone(0);
                    todoList.add(inner);
                    promiseItem.setTodoList(todoList);
                    promiseItem.setGift(gift);
                    promiseItem.setDone(0);
                    items.add(promiseItem);
                    updated=true;

                }


        }
        ByteArrayOutputStream baos= new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(items);
        serializedItems = baos.toByteArray();
        promise.setPromise_list(serializedItems);
        if(promiseMapper.updatePromise(promise)==1&&updated){
            resultBody.put("message", "업데이트 완료");
            result.put(true, resultBody);
            return result;

        }
        else{
            resultBody.put("message", "업데이트 실패");
            result.put(false, resultBody);
            return result;

        }
    }


    public Map<Boolean,Object> deletePromise(String name,String index) throws IOException, ClassNotFoundException {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if((index.length()==3&&(!Character.isDigit(index.charAt(0))||index.charAt(1)!='-'||!Character.isDigit(index.charAt(2)))) ||
                index.length()==1&&!Character.isDigit(index.charAt(0)) || index.length()!=3){
            resultBody.put("message", "index 입력 오류");
            result.put(false, resultBody);
            return result;
        }
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
        boolean updated=false;
        loop:for(PromiseItemDto item:items){
            for(PromiseInnerItemDto inner:item.getTodoList()){
                if(item.getId()==index.charAt(0)-'0'&&inner.getId()==index.charAt(2)-'0'){
                    item.getTodoList().remove(inner);
                    if(item.getTodoList().size()==0){
                        items.remove(item);
                    }
                    updated=true;
                    break loop;
                }
            }
        }
        ByteArrayOutputStream baos= new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(items);
        serializedItems = baos.toByteArray();
        promise.setPromise_list(serializedItems);
        if(promiseMapper.updatePromise(promise)==1&&updated){
            resultBody.put("message", "삭제 완료");
            result.put(false, resultBody);
            return result;

        }
        else{
            resultBody.put("message", "삭제 실패");
            result.put(false, resultBody);
            return result;

        }

    }
    public Map<Boolean,Object> donePromise(String name,String index) throws IOException, ClassNotFoundException {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if((index.length()==3&&(!Character.isDigit(index.charAt(0))||index.charAt(1)!='-'||!Character.isDigit(index.charAt(2)))) ||
                index.length()==1&&!Character.isDigit(index.charAt(0))){
            resultBody.put("message", "index 입력 오류");
            result.put(false, resultBody);
            return result;
        }
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
        boolean updated = false;
        if(index.length()==3) {
            loop:for (PromiseItemDto item : items) {
                for (PromiseInnerItemDto inner : item.getTodoList()) {
                    if (item.getId() == index.charAt(0) - '0' && inner.getId() == index.charAt(2) - '0') {
                        inner.setDone(1);
                        updated = true;
                        break loop;
                    }
                }
            }
        }
        if(index.length()==1){
            for (PromiseItemDto item : items) {
                if (item.getId() == index.charAt(0) - '0'){
                    item.setDone(1);
                    updated = true;
                    break;
                }
            }
        }
        ByteArrayOutputStream baos= new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(items);
        serializedItems = baos.toByteArray();
        promise.setPromise_list(serializedItems);
        if(promiseMapper.updatePromise(promise)==1&&updated){
            resultBody.put("message", "done 완료");
            result.put(true, resultBody);
            return result;

        }
        else{
            resultBody.put("message", "done 실패");
            result.put(false, resultBody);
            return result;

        }

    }

}
