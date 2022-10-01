package com.ihagong.momssok.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ihagong.momssok.model.dto.EmotionSaveDto;
import com.ihagong.momssok.util.BASE64DecodedMultipartFile;
import com.ihagong.momssok.model.dto.testImageDto;
import lombok.RequiredArgsConstructor;
//import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.*;
@Service
@RequiredArgsConstructor
public class TestService {
    private final FastApiEmotion fastApiEmotion;
    private final FastApiDetection fastApiDetection;
    public Map<Boolean,Object> ApiTestEmotion(EmotionSaveDto saveDto) throws IOException, SQLException {

        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();


        //통신 부분 스레드로 실행
        fastApiEmotion.fastApiEmotion(saveDto);

        resultBody.put("status", "SUCCESS");
        result.put(true, resultBody);
        return result;

    }


    public Map<Boolean,Object> ApiTestDetection(testImageDto dto) throws JsonProcessingException, SQLException {

        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();

        MultipartFile multipartFile = BASE64DecodedMultipartFile.base64ToMultipart(dto.getImageBase64());
        dto.setMultipartFile(multipartFile);

        //통신 부분 스레드로 실행
        fastApiDetection.fastApiDetection(dto);
        resultBody.put("status", "SUCCESS");
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
