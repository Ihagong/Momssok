package com.ihagong.momssok.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ihagong.momssok.mapper.DrawingMapper;
import com.ihagong.momssok.model.dto.DrawingTagDto;
import com.ihagong.momssok.model.dto.testImageDto;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FastApiDetection {

    private final DrawingMapper drawingMapper;
    @Async
    public void fastApiDetection(testImageDto dto) throws JsonProcessingException, SQLException {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body  = new LinkedMultiValueMap<>();
        MultipartFile file = dto.getMultipartFile();
        body.add("file", file.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate
                .postForEntity("http://j7d203.p.ssafy.io:8003/tag", requestEntity, String.class);


        //받은 데이터 파싱
//        System.out.println("body : "+response.getBody());

        JSONArray jsonArray = new JSONArray(response.getBody());
        System.out.println(jsonArray);
        ObjectMapper mapper = new ObjectMapper();
        List<String> list = mapper.readValue(String.valueOf(jsonArray), List.class);
        System.out.println(list);
        dto.setList(list);

        detectionList(dto);


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

    public void detectionList(testImageDto dto) throws SQLException {
        StringBuffer tag = new StringBuffer();
        List<String> list = dto.getList();
        for(int i=0; i <list.size();i++){
            tag.append(list.get(i));
            tag.append(" ");
        }

        DrawingTagDto drawing = new DrawingTagDto();
        drawing.setTag(tag.toString());

        if (dto.getDrawing_id() != 0) {
            drawing.setDrawing_id(dto.getDrawing_id());
        }else{
            String name = dto.getName();
            drawing.setDrawing_id(drawingMapper.getImageId(name));
        }

        int result = drawingMapper.saveTag(drawing);
        if(result == 1){
            System.out.println("태그 저장 완료");
        }
    }
}
