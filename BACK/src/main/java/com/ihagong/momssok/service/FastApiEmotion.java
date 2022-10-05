package com.ihagong.momssok.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ihagong.momssok.mapper.DiaryMapper;
import com.ihagong.momssok.mapper.DrawingMapper;
import com.ihagong.momssok.model.dto.DrawingTagDto;
import com.ihagong.momssok.model.dto.EmotionSaveDto;
import com.ihagong.momssok.model.dto.emotionDto;
import com.ihagong.momssok.model.dto.testImageDto;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class FastApiEmotion {
    private final DiaryMapper diaryMapper;

    @Async
    public void fastApiEmotion(EmotionSaveDto saveDto) throws JsonProcessingException, SQLException {
        HttpEntity<String> entity = new HttpEntity<>("");
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "http://j7d203.p.ssafy.io:8004/emotion?item_id="+saveDto.getContent(), //{요청할 서버 주소}
                HttpMethod.POST, //{요청할 방식}
                entity, // {요청할 때 보낼 데이터}
                String.class
        );

        //받은 데이터 파싱
        //System.out.println("body : "+response.getBody());
        JSONObject jObject = new JSONObject(response.getBody());
        //JSONObject emotions_percent = jObject.getJSONObject("emotions_percent");
        //JSONObject emotions_score = jObject.getJSONObject("emotions_score");
        //Map percent = new ObjectMapper().readValue(emotions_percent.toString(), Map.class);
        //Map score = new ObjectMapper().readValue(emotions_score.toString(), Map.class);
        Map emotions = new ObjectMapper().readValue(jObject.toString(), Map.class);
        System.out.println("감정 데이터");
        System.out.println("emotions : "+emotions);
        System.out.println("emotions : "+emotions.get("emotion"));
        emotionDto dto = new emotionDto();
        dto.setEmotionsMap(emotions);
        dto.setId(saveDto.getId());
        emotionList(dto);


    }

    public void emotionList(emotionDto dto) throws SQLException {
        StringBuffer emo = new StringBuffer();
        Map<String, Object> dict = dto.getEmotionsMap();

        for(String key: dict.keySet()){
            if(key.equals("emotion")) continue;
            char quotes = '"';
            emo.append(key+":"+dict.get(key)+", ");
        }
        emo.delete(emo.length()-2,emo.length());
        System.out.println(emo);
        System.out.println(dto.getId());
        dto.setEmotion_all(emo.toString());
        dto.setEmotion(dto.getEmotionsMap().get("emotion").toString());
        int result = diaryMapper.saveEmotion(dto);
        if(result == 1){
            System.out.println("감정 저장 완료");
        }
    }
}
