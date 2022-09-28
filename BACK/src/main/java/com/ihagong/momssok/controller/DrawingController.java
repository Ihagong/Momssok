package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.DrawingApiDto;
import com.ihagong.momssok.model.dto.DrawingDto;
import com.ihagong.momssok.model.dto.DrawingInputDto;
import com.ihagong.momssok.model.dto.DrawingOutDto;
import com.ihagong.momssok.service.DrawingService;
import com.ihagong.momssok.service.DrawingServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DrawingController {

    private final String success = "SUCCESS";
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final DrawingService drawingService;
    private final DrawingServiceImpl drawingServiceImpl;

    @GetMapping("/searchDrawing")
    public Map<String, Object> lookupAllDrawing(@RequestParam String name){
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

        try {
            DrawingDto drawing = drawingService.lookupDrawing(drawing_id);
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
                                             @RequestBody DrawingApiDto drawing){  //base64 문자열, 아이 이름

        Map<String, Object> result = new HashMap<>();

        String base64Source = drawing.getDrawing_base64();
        String base64 = base64Source.split(",")[1];
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
                String name = drawing.getName();
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

    //AI 서버로 그림 분석 결과 요청할 때 그림을 보낸다
    @GetMapping("/detection")
    public ResponseEntity<?> detection(@RequestParam MultipartFile file){

        Map<Boolean,Object> result = drawingServiceImpl.detection(file);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/updateDrawing")
    public Map<String, Object> updateDrawing(@RequestBody DrawingApiDto drawing){  //base64랑 아이 이름을 받는다

        Map<String, Object> result = new HashMap<>();

        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            String name = drawing.getName();
            String email_name = email + "_" + name;
            drawing.setEmail_name(email_name);

            int res = drawingService.updateDrawing(drawing);  //삭제하려는 사용자가 현재 사용자와 일치하면 삭제
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

    @GetMapping("/getDrawing")  //이미지를 base64로 인코딩하여 프론트에 보내기
    public String getBase64(@RequestParam int drawing_id) throws Exception {

        String painting = drawingService.getDrawing(drawing_id);  //이미지를 가져온다

        byte[] file = FileUtils.readFileToByteArray(new File(painting));  //bytearray로 변환
        String base64 = Base64.getEncoder().encodeToString(file);  //base64로 인코딩

        return base64;
    }

    @DeleteMapping("/deleteDrawing")
    public Map<String, Object> deleteDrawing(@RequestBody DrawingOutDto drawing){  //email과 그림 id를 받는다

        Map<String, Object> result = new HashMap<>();

        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            drawing.setEmail(email);
            int res = drawingService.deleteDrawing(drawing);  //삭제하려는 사용자가 현재 사용자와 일치하면 삭제
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
