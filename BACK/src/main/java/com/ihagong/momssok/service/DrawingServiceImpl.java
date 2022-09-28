package com.ihagong.momssok.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ihagong.momssok.mapper.DrawingMapper;
import com.ihagong.momssok.model.dto.DrawingApiDto;
import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.model.dto.DrawingOutDto;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DrawingServiceImpl implements DrawingService{

    private final DrawingMapper drawingMapper;

    @Override
    public List<DrawingDto> lookupAllDrawing(String email_name) throws Exception {
        return drawingMapper.lookupAllDrawing(email_name);
    }

    @Override
    public DrawingDto lookupDrawing(int drawing_id) throws Exception {
        return drawingMapper.lookupDrawing(drawing_id);
    }

    @Override
    public int saveDrawing(DrawingDto drawingDto) throws Exception {
        return drawingMapper.saveDrawing(drawingDto);
    }


//    @Async  //스레드 사용
//    public Map<Boolean,Object> detection(MultipartFile file) {
//
//        Map<Boolean,Object> result = new HashMap<>();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//        body.add("file", file.getResource());
//
//        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
//        RestTemplate restTemplate = new RestTemplate();
//        System.out.println("test");
//
//        ResponseEntity<String> response = restTemplate
//                .postForEntity("http://j7d203.p.ssafy.io:8003/tag", requestEntity, String.class);
//
//        JSONObject jObject = new JSONObject(response.getBody());
//        JSONObject tag = jObject.getJSONObject("tag");  //객체 이름
//        Map cord = new ObjectMapper().readValue(tag.toString(), Map.class);  //좌표
//        System.out.println("태그 저장");
//
//    }

    @Override
    public int updateDrawing(DrawingApiDto drawing) throws Exception {
        return drawingMapper.updateDrawing(drawing);
    }

    @Override
    public String getDrawing(int drawing_id) throws Exception {
        return drawingMapper.getDrawing(drawing_id);
    }

    @Override
    public int deleteDrawing(DrawingOutDto drawing) throws Exception {
        return drawingMapper.deleteDrawing(drawing);
    }
}
