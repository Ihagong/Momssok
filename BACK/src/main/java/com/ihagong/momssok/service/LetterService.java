package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.LetterMapper;
import com.ihagong.momssok.model.dto.LetterApiDto;
import com.ihagong.momssok.model.dto.LetterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
        //System.out.println(videoFile.getContentType());
        if(videoFile!=null) {
            String path = "/files1/";
            UUID uuid = UUID.randomUUID();
            String filepath = path + uuid + "_" + videoFile.getOriginalFilename();
            System.out.println(System.getProperty("user.dir"));
            File f=new File(filepath);
            f.mkdirs();
            f.createNewFile();

            System.out.println(f.getPath());
            System.out.println(f.getAbsolutePath());

            videoFile.transferTo(f);
            System.out.println(videoFile.getOriginalFilename());
            System.out.println(videoFile.getSize());
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
        if(letterMapper.detailletter(letter_id)==null){
            resultBody.put("message", "해당 letter_id가 데이터베이스에 존재하지 않습니다.");
            result.put(false, resultBody);
            return result;
        }
        letterMapper.updateRead(letter_id);
        LetterDto dto = letterMapper.detailletter(letter_id);
        LetterApiDto letter = new LetterApiDto();
        letter.setContent(dto.getContent());
        letter.setDate(dto.getDate());
        letter.setTitle(dto.getTitle());
        letter.setLetter_id(dto.getLetter_id());
        letter.setAuthor(dto.getSend_from().replace(email+"_",""));
        letter.setReceiver(dto.getSend_to().replace(email+"_",""));
        letter.setCheck(dto.getRead_check());

        resultBody.put("letter", letter);
        result.put(true, resultBody);
        return result;

    }

    public File getVideo(int letter_id) throws IOException {
        LetterDto dto = letterMapper.detailletter(letter_id);
        File video=  new File(dto.getVideo_path());
        //File video=  new File( "/home/ubuntu/files/모션인식도구선택.mp4");

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
            letter.setAuthor(dto.getSend_from().replace(email+"_",""));
            letter.setReceiver(dto.getSend_to().replace(email+"_",""));
            letter.setLetter_id(dto.getLetter_id());
            letter.setCheck(dto.getRead_check());
            letters.add(letter);

        }

        resultBody.put("letters", letters);
        result.put(true, resultBody);
        return result;

    }

    public Map<Boolean,Object> deleteLetter(int letter_id) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        if(letterMapper.detailletter(letter_id)==null){
            resultBody.put("message", "해당 letter_id가 데이터베이스에 존재하지 않습니다.");
            result.put(false, resultBody);
            return result;
        }
        if(letterMapper.deleteLetter(letter_id)==1){
            resultBody.put("message", "삭제가 완료되었습니다.");
            result.put(true, resultBody);
            return result;
        }
        resultBody.put("message", "편지 삭제 오류");
        result.put(false, resultBody);
        return result;


    }

}
