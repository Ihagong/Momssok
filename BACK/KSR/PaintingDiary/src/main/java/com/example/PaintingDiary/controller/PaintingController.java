package com.example.PaintingDiary.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user/painting")
@RequiredArgsConstructor
public class PaintingController {

    private final String success = "SUCCESS";
    private final String fail = "FAIL";
    private final String error = "ERROR";

    @PostMapping("/upload")
    public Map<String, Object> savePainting(
            HttpServletRequest request,
            @RequestBody MultipartFile file) throws Exception {

        Map<String, Object> result = new HashMap<>();

        String fileName = file.getOriginalFilename();
        System.out.println(fileName);   //업로드 파일명(확장자 포함)
        System.out.println(request.getServletContext().getRealPath("/"));   //경로 확인

        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
            String uploadDate = simpleDateFormat.format(new Date());
            String painting = save(file, uploadDate);   //파일 저장

            try {
                result.put("status", success);
                result.put("data", painting);
            } catch (Exception e) {
                result.put("status", fail);
            }
            return result;
        } catch (IllegalStateException e){
            result.put("status", error);
            result.put("message", e.toString());
            return result;
        }
    }

    private String save(MultipartFile file, String uploadDate) {

        try {
            String newFileName = uploadDate + file.getOriginalFilename();   //새로운 파일명 생성
            Path path = Paths.get(newFileName);
            System.out.println(path);   //새로운 파일명 확인

            byte[] bytes = file.getBytes();   //파일의 바이트 배열 반환
            Files.write(path, bytes);   //파일에 bytes 입력
            return path.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
