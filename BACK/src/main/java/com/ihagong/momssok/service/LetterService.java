package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.LetterMapper;
import com.ihagong.momssok.model.dto.LetterApiDto;
import com.ihagong.momssok.model.dto.LetterDto;
import com.ihagong.momssok.model.dto.UserApiDto;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class LetterService {
    private final LetterMapper letterMapper;
    public Map<Boolean,Object> sendLetter(MultipartFile videoFile, String send_from, String send_to, String title, String content) throws IOException {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, String> resultBody = new HashMap<>();
        LetterDto letter = new LetterDto();
        letter.setSend_from(email+"_"+send_from);
        letter.setSend_to(email+"_"+send_to);
        if(letterMapper.userCheck(letter.getSend_from())!=1||letterMapper.userCheck(letter.getSend_to())!=1){
            resultBody.put("Messege", "발신자 또는 수신자 입력 오류");
            result.put(true, resultBody);
            return result;
        }
        letter.setTitle(title);
        letter.setContent(content);
        System.out.println(videoFile.getContentType());
        if(videoFile!=null) {
            String path = "C:\\Users\\multicampus\\Documents\\fileTest\\";
            UUID uuid = UUID.randomUUID();
            String filepath = path + uuid + "_" + videoFile.getOriginalFilename();
            videoFile.transferTo(new File(filepath));
            letter.setVideo_path(filepath);
        }
        letter.setDate(new Date());
        if(letter.getSend_from().contains(email)&&letter.getSend_to().contains(email)) {
            if (letterMapper.saveLetter(letter) == 1) {
                resultBody.put("Messege", "편지 전송 완료");
                result.put(true, resultBody);
                return result;
            } else {
                resultBody.put("Messege", "편지 전송 실패");
                result.put(true, resultBody);
                return result;
            }
        }
        else{
            resultBody.put("Messege", "발신자 또는 수신자 입력 오류");
            result.put(true, resultBody);
            return result;
        }


    }
    public Map<Boolean,Object> lookupLetter(int letter_id) throws IOException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        LetterDto dto = letterMapper.detailletter(letter_id);
        LetterApiDto letter = new LetterApiDto();
        letter.setContent(dto.getContent());
        letter.setDate(dto.getDate());
        letter.setTitle(dto.getTitle());
        letter.setSend_from(dto.getSend_from().replace(email+"_",""));
        letter.setSend_to(dto.getSend_to().replace(email+"_",""));

        resultBody.put("letter", letter);
        result.put(true, resultBody);
        return result;

    }

    public File getVideo(int letter_id) throws IOException {
        LetterDto dto = letterMapper.detailletter(letter_id);
        File video=  new File(dto.getVideo_path());

        return video;
    }
    public Map<Boolean,Object> lookupAllLetter(String name) throws IOException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        List<LetterDto> list = letterMapper.searchletter(email+"_"+name);
        List<LetterApiDto> letters=new LinkedList<>();
        for(LetterDto dto:list){
            LetterApiDto letter = new LetterApiDto();
            letter.setContent(dto.getContent());
            letter.setDate(dto.getDate());
            letter.setTitle(dto.getTitle());
            letter.setSend_from(dto.getSend_from().replace(email+"_",""));
            letter.setSend_to(dto.getSend_to().replace(email+"_",""));
            letters.add(letter);
        }

        resultBody.put("letters", letters);
        result.put(true, resultBody);
        return result;

    }
}
