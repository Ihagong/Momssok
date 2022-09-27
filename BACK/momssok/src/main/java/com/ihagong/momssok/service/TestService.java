package com.ihagong.momssok.service;

import lombok.RequiredArgsConstructor;
//import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
@Service
@RequiredArgsConstructor
public class TestService {
    private final FastApiEmotion fastApiEmotion;
    private final FastApiDetection fastApiDetection;
    public Map<Boolean,Object> ApiTestEmotion(String text) throws IOException {

        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();


        //통신 부분 스레드로 실행
        fastApiEmotion.fastApiEmotion(text);

        resultBody.put("messege", "즉시 응답 메세지");
        result.put(true, resultBody);
        return result;

    }
    public Map<Boolean,Object> ApiTestDetection(MultipartFile file)  {

        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();


        //통신 부분 스레드로 실행
        fastApiDetection.fastApiDetection(file);

        resultBody.put("messege", "즉시 응답 메세지");
        result.put(true, resultBody);
        return result;

    }



}
