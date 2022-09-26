package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.service.DiaryService;
import com.ihagong.momssok.service.DrawingService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DiaryController {

    private final String success = "SUCCESS";
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final DiaryService diaryService;
    private final DrawingService drawingService;

    @GetMapping("/searchDrawing")
    public Map<String, Object> lookupAllDrawing(@RequestParam String name){  //name만 받고 서버에서 회원의 email을 꺼내서 email_name으로 쓰자
        Map<String, Object> result = new HashMap<>();
        List<DrawingDto> drawingList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            String email_name = email + "_" + name;
            drawingList = drawingService.lookupAllDrawing(email_name);

            if(drawingList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", drawingList);
        return result;
    }

    @GetMapping("/detailDrawing")
    public Map<String, Object> lookupDrawing(@RequestParam int drawing_id){
        Map<String, Object> result = new HashMap<>();

        DrawingDto drawing;
        try {
            drawing = drawingService.lookupDrawing(drawing_id);
            if(drawing != null){
                result.put("statue", success);
                result.put("data", drawing);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }

    @PostMapping("/saveDrawing")
    public Map<String, Object> saveDrawing(@RequestBody DrawingDto drawing){

        Map<String, Object> result = new HashMap<>();

        String base64 = drawing.getDrawing_base64();

        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
            String uploadDate = simpleDateFormat.format(new Date());


            try {
                DrawingDto drawing =
                int res = drawingService.saveDrawing(painting)  //이미지 저장
                if (res == 1) {
                    result.put("status", success);
                    result.put("data", )
                }
            }

        }
    }

    public static String decoder(String base64){

        String data = base64.split(",")[1];  //base64 문자열
        byte[] imageBytes = Base64.getDecoder().decode(data);  //base64 문자열을 디코딩
        System.out.println(new String(imageBytes));  //디코딩 g
        FileUtils.writeByteArrayToFile(new File(target), imageBytes);
    }

    @GetMapping("/getDrawing")  //이미지를 base64 형태로 인코딩하여 프론트에 보내기
    public String getBase64(@RequestParam int drawing_id){

        String painting = drawingService.getDrawing(drawing_id);  //이미지를 가져온다

        byte[] file = FileUtils.readFileToByteArray(new File(painting.getPath()));  //bytearray로 변환
        String base64 = Base64.getEncoder().encodeToString(file);  //base64로 인코딩

        return base64;
    }

}
