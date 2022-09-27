package com.ihagong.momssok.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ihagong.momssok.mapper.LetterMapper;
import lombok.RequiredArgsConstructor;
//import org.json.simple.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;
import java.util.*;
@Service
@RequiredArgsConstructor
public class TestService {
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


        HttpEntity<String> entity = new HttpEntity<>("");
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "http://j7d203.p.ssafy.io:8002/emotion?text="+text, //{요청할 서버 주소}
                HttpMethod.GET, //{요청할 방식}
                entity, // {요청할 때 보낼 데이터}
                String.class
        );

        //받은 데이터 파싱
        System.out.println("body : "+response.getBody());
        JSONObject jObject = new JSONObject(response.getBody());
        JSONObject emotions_percent = jObject.getJSONObject("emotions_percent");
        JSONObject emotions_score = jObject.getJSONObject("emotions_score");
        Map percent = new ObjectMapper().readValue(emotions_percent.toString(), Map.class);
        Map score = new ObjectMapper().readValue(emotions_score.toString(), Map.class);
        System.out.println("percent : "+percent);
        System.out.println("score : "+score);
        resultBody.put("percent", percent);
        resultBody.put("score", score);
        result.put(true, resultBody);
        return result;

    }



}
