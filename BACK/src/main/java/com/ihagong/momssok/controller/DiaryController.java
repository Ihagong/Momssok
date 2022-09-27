package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.service.DrawingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
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
    private final DrawingService drawingService;

    @GetMapping("/searchDrawing")
    public Map<String, Object> lookupAllDrawing(@RequestParam String name){  //name만 받고 서버에서 회원의 email을 꺼내서 email_name으로 쓰자
        Map<String, Object> result = new HashMap<>();
        List<DrawingDto> drawingList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();  //user의 email을 꺼낸다
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
    public Map<String, Object> saveDrawing(  //프론트에서 base64를 받아 이미지로 변환시킨 뒤 db에 저장, ai 서버로 보내서 태그랑 같이 받아와 저장
                                             @RequestBody ){  //base64 문자열, 아이 이름

        Map<String, Object> result = new HashMap<>();

        String base64 = drawing.split(",")[1];
        System.out.println(base64);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String fileName = simpleDateFormat.format(new Date());  //파일명

        //저장할 파일 경로
        String path = "C:\\Users\\multicampus\\Desktop\\resources\\";

        UUID uuid = UUID.randomUUID();  //파일명 중복 방지용 식별자
        String filePath = path + fileName + "_" + uuid + ".png";

        try {

            //base64를 이미지 파일로 변환하고 저장한다.
            byte[] imageBytes = Base64.getDecoder().decode(base64
                                        .replace('-', '+')
                                        .replace('_', '/'));
//            byte[] imageBytes = Base64Utils.decodeFromUrlSafeString(base64);

            FileOutputStream fileOutputStream = new FileOutputStream(filePath);
            fileOutputStream.write(imageBytes);
            fileOutputStream.close();

            try {
                DrawingDto drawingDto = new DrawingDto();
                String email= SecurityContextHolder.getContext().getAuthentication().getName();  //user의 email을 꺼낸다
                String email_name = email + "_" + name;
                drawingDto.setEmail_name(email_name);
                drawingDto.setImage_path(filePath);
                int res = drawingService.saveDrawing(drawingDto);  //이미지 저장
                if (res == 1) {
                    result.put("status", success);
                }else{
                    result.put("status", fail);
                }
            } catch (Exception e) {
                result.put("status", error);
                result.put("message", e.toString());
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    //AI 서버로 그림 분석 결과 요청할 때 그림보내기
    //태그 - 시리얼라이즈로 처리



//    @PutMapping("/updateDrawing")
//    public Map<String, Object> updateDrawing(@RequestBody DrawingDto drawing){
//
//        Map<String, Object> result = new HashMap<>();
//
//        try {
//            String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        }
//    }

    @GetMapping("/getDrawing")  //이미지를 base64 형태로 인코딩하여 프론트에 보내기
    public String getBase64(@RequestParam int drawing_id){

        String painting = drawingService.getDrawing(drawing_id);  //이미지를 가져온다

        byte[] file = FileUtils.readFileToByteArray(new File(painting));  //bytearray로 변환
        String base64 = Base64.getEncoder().encodeToString(file);  //base64로 인코딩

        return base64;
    }

    @DeleteMapping("/deleteDrawing")
    public Map<String, Object> deleteDrawing(@RequestBody int drawing_id){

        Map<String, Object> result = new HashMap<>();

        try {
            //이메일과 id를 같이 넣어주자

            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            int res = drawingService.deleteDrawing(email);  //삭제하려는 사용자가 현재 사용자와 일치하면 삭제
            if(res == 1){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

}
