package com.example.PaintingDiary.controller;

import com.example.PaintingDiary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
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

    private final DiaryService diaryService;

    @PostMapping("/upload")   //이미지 저장
    public Map<String, Object> savePainting(
            HttpServletRequest request,
            @RequestPart(value = "file", required = true) MultipartFile file) throws Exception {

        Map<String, Object> result = new HashMap<>();

        String fileName = file.getOriginalFilename();
        String fileUrl = request.getServletContext().getRealPath("/");
        System.out.println(fileName);   //업로드 파일명(확장자 포함) 확인
        System.out.println(fileUrl);   //경로 확인

        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
            String uploadDate = simpleDateFormat.format(new Date());
            String painting = save(file, fileUrl, uploadDate);   //저장 경로 return

            try {
                int res = diaryService.saveDiary(painting);   //이미지 저장
                if (res == 1) {
                    result.put("status", success);
                    result.put("data", painting);
                } else {
                    result.put("status", fail);
                }
            } catch (Exception e) {
                result.put("status", error);
                result.put("message", e.toString());
            }
            return result;
        } catch (IllegalStateException e){
            result.put("status", error);
            result.put("message", e.toString());
            return result;
        }
    }

    private String save(MultipartFile file, String fileUrl, String uploadDate) {

        try {
            String newFileName = uploadDate + file.getOriginalFilename();   //새로운 파일명 생성
            Path path = Paths.get(fileUrl + newFileName);
            System.out.println(path);   //새로운 파일명 확인

            byte[] bytes = file.getBytes();   //파일의 바이트 배열 반환
            Files.write(path, bytes);   //파일에 bytes 입력
            return path.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/download")   //이미지 전송(경로)
    public Map<String, Object> getPainting(int id)  throws Exception {  //파싱할 필요없기 때문에 RequestBody 사용X

        Map<String, Object> result = new HashMap<>();

        try {
            String painting = diaryService.getDiary(id);
            if(painting != null) {
                result.put("status", success);
                result.put("data", painting);
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
