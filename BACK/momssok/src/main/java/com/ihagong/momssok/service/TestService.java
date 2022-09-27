package com.ihagong.momssok.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ihagong.momssok.mapper.LetterMapper;
import com.ihagong.momssok.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
//import org.json.simple.JSONObject;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;
import java.util.*;
@Service
@RequiredArgsConstructor
public class TestService {
    private final FastApi fastApi;
    public Map<Boolean,Object> ApiTest(String text) throws IOException {

        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        /* //Json으로 보낼 때
        JSONObject jobj = new JSONObject();
        jobj.put("text",text);
        String json_string = new Gson().toJson(jobj);

        HttpHeaders headers = new HttpHeaders();
        System.out.println(json_string);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(json_string, headers);
        */

        //통신 부분 스레드로 실행
        fastApi.fastApi(text);

        resultBody.put("messege", "즉시 응답 메세지");
        result.put(true, resultBody);
        return result;

    }




}
