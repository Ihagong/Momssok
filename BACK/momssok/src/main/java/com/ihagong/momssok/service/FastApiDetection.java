package com.ihagong.momssok.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class FastApiDetection {
    public void fastApiDetection(MultipartFile file) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body  = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("test");

        ResponseEntity<String> response = restTemplate
                .postForEntity("http://j7d203.p.ssafy.io:8003/tag", requestEntity, String.class);


        //받은 데이터 파싱
        System.out.println("body : "+response.getBody());
        //JSONObject jObject = new JSONObject(response.getBody());
        /*
        JSONObject emotions_percent = jObject.getJSONObject("emotions_percent");
        JSONObject emotions_score = jObject.getJSONObject("emotions_score");
        Map percent = new ObjectMapper().readValue(emotions_percent.toString(), Map.class);
        Map score = new ObjectMapper().readValue(emotions_score.toString(), Map.class);
        System.out.println("db에 감정 데이터 저장");
        System.out.println("percent : "+percent);
        System.out.println("score : "+score);

         */

    }
}
