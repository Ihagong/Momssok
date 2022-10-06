package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.*;
import com.ihagong.momssok.service.DrawingService;
import com.ihagong.momssok.service.TestService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.StandardCopyOption;
import java.sql.SQLException;
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
    private final TestService testService;


    @GetMapping("/searchDrawing")
    public Map<String, Object> lookupAllDrawing(@RequestParam String name){
        Map<String, Object> result = new HashMap<>();
        List<DrawingDto> drawingList = new ArrayList<>();

        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();  //user의 email을 꺼낸다
            String email_name = email + "_" + name;

            drawingList = drawingService.lookupAllDrawing(email_name);

            for(DrawingDto item: drawingList){
                String painting = drawingService.getDrawing(item.getDrawing_id());  //이미지를 가져온다

                byte[] file = FileUtils.readFileToByteArray(new File(painting));  //bytearray로 변환
                String base64 = "data:image/png;base64," + Base64.getEncoder().encodeToString(file);  //base64로 인코딩
                item.setDrawing_base64(base64);
            }

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

            String painting = drawingService.getDrawing(drawing_id);  //이미지를 가져온다

            byte[] file = FileUtils.readFileToByteArray(new File(painting));  //bytearray로 변환
            String base64 = "data:image/png;base64," + Base64.getEncoder().encodeToString(file);  //base64로 인코딩
            drawing.setDrawing_base64(base64);

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
            @RequestBody DrawingDto drawing){  //base64 문자열, 아이 이름

        Map<String, Object> result = new HashMap<>();

        String base64Source = drawing.getDrawing_base64();
        String base64 = base64Source.split(",")[1];

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String fileName = simpleDateFormat.format(new Date());  //파일명

        //저장할 파일 경로
        String path = "/files1/";

        UUID uuid = UUID.randomUUID();  //파일명 중복 방지용 식별자
        String filePath = path + fileName + "_" + uuid + ".png";
//        File test = new File("C:\\Users\\multicampus\\Desktop\\20220930_5727f8fb-700c-42ad-9507-362538cdc352.png");

        try {

            //base64를 이미지 파일로 변환하고 저장한다.
            ByteArrayResource resource = new ByteArrayResource(javax.xml.bind.DatatypeConverter.parseBase64Binary(base64));
            File targetFile = new File(filePath);
            java.nio.file.Files.copy(
                    resource.getInputStream(),
                    targetFile.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);
            IOUtils.closeQuietly(resource.getInputStream());

            try {
                String email= SecurityContextHolder.getContext().getAuthentication().getName();  //user의 email을 꺼낸다
                String name = drawing.getName();
                String email_name = email + "_" + name;

                drawing.setEmail_name(email_name);
                drawing.setImage_path(filePath);
                int res = drawingService.saveDrawing(drawing);  //이미지 저장
                if (res == 1) {
                    DrawingInputDto drawingInputDto = new DrawingInputDto();
                    int id = drawingService.getImageId(name);
                    drawingInputDto.setDrawing_id(id);
                    drawingInputDto.setDrawing_base64(drawing.getDrawing_base64());

                    result.put("status", success);
                    result.put("data", drawingInputDto);

                    testImageDto dto = new testImageDto();
                    dto.setImageBase64(base64Source);
                    dto.setName(name);
                    testService.ApiTestDetection(dto);

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


    //AI 서버로 그림 분석 결과 요청
    @RequestMapping(value = "/testDetection", method = RequestMethod.GET)
    public ResponseEntity<?> testDetection2(@RequestBody testImageDto dto) throws IOException, SQLException {
        Map<Boolean,Object> result = testService.ApiTestDetection(dto);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }


//    @GetMapping("/getDrawing")  //이미지를 base64로 인코딩하여 프론트에 보내기
//    public String getBase64(@RequestParam int drawing_id) throws Exception {
//
//        String painting = drawingService.getDrawing(drawing_id);  //이미지를 가져온다
//
//        byte[] file = FileUtils.readFileToByteArray(new File(painting));  //bytearray로 변환
//        String base64 = Base64.getEncoder().encodeToString(file);  //base64로 인코딩
//
//        return "date:image/png;base64," + base64;
//    }


    @PutMapping("/updateDrawing")
    public Map<String, Object> updateDrawing(@RequestBody DrawingApiDto drawing){  //그림 id, base64, 아이 이름을 받는다

        Map<String, Object> result = new HashMap<>();

        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            String name = drawing.getName();
            String email_name = email + "_" + name;
            drawing.setEmail_name(email_name);

            String base64Source = drawing.getDrawing_base64();
            String base64 = base64Source.split(",")[1];

            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
            String fileName = simpleDateFormat.format(new Date());  //파일명

            //저장할 파일 경로
            String path = "/files1/";

            UUID uuid = UUID.randomUUID();  //파일명 중복 방지용 식별자
            String filePath = path + fileName + "_" + uuid + ".png";

            ByteArrayResource resource = new ByteArrayResource(javax.xml.bind.DatatypeConverter.parseBase64Binary(base64));
            File targetFile = new File(filePath);
            java.nio.file.Files.copy(
                    resource.getInputStream(),
                    targetFile.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);
            IOUtils.closeQuietly(resource.getInputStream());

            try {
                drawing.setImage_path(filePath);
                int res = drawingService.updateDrawing(drawing);  //수정하려는 사용자가 현재 사용자와 일치한지 확인
                if(res == 1){
                    testImageDto dto = new testImageDto();
                    dto.setDrawing_id(drawing.getDrawing_id());
                    dto.setImageBase64(base64Source);
                    dto.setName(name);
                    testService.ApiTestDetection(dto);
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


    @DeleteMapping("/deleteDrawing")
    public Map<String, Object> deleteDrawing(@RequestBody DrawingOutDto drawing){

        Map<String, Object> result = new HashMap<>();

        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            String name = drawing.getName();
            String email_name = email + "_" + name;
            drawing.setEmail_name(email_name);

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
