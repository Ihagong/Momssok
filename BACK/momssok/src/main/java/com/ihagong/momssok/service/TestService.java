package com.ihagong.momssok.service;

import com.ihagong.momssok.util.BASE64DecodedMultipartFile;
import com.ihagong.momssok.model.dto.testImageDto;
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


    public Map<Boolean,Object> ApiTestDetection(testImageDto dto){

        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();


        MultipartFile multipartFile = BASE64DecodedMultipartFile.base64ToMultipart(dto.getImageBase64());

        //통신 부분 스레드로 실행
        fastApiDetection.fastApiDetection(multipartFile);
        resultBody.put("messege", "즉시 응답 메세지");
        result.put(true, resultBody);
        return result;

    }

    /*
    public Map<Boolean,Object> ApiTestDetection(MultipartFile file)  {

        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();


        //통신 부분 스레드로 실행
        //fastApiDetection.fastApiDetection(file); 스레드로 실행하면 오류

        resultBody.put("messege", "즉시 응답 메세지");
        result.put(true, resultBody);
        return result;

    }
     */
}
