package com.ihagong.momssok.controller;

import com.ihagong.momssok.service.LetterService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class LetterController {
    private final LetterService letterService;
    @RequestMapping(value = "/letter/sendLetter", method = RequestMethod.POST)
    public ResponseEntity<?> sendLetter(@RequestParam @Nullable MultipartFile videoFile, @RequestParam String author,
                                        @RequestParam String receiver, @RequestParam String title, @RequestParam @Nullable String content) throws IOException{
        Map<Boolean,Object> result = letterService.sendLetter(videoFile, author, receiver, title,content);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/letter/lookupLetter", method = RequestMethod.GET)
    public ResponseEntity<?> lookupLetter(@RequestParam int letter_id) throws IOException {
        Map<Boolean,Object> result = letterService.lookupLetter(letter_id);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/letter/getVideo", method = RequestMethod.GET)
    public ResponseEntity<?> getVideo(@RequestParam int letter_id) throws IOException {
        File file = letterService.getVideo(letter_id);
        byte[] fileContent = FileUtils.readFileToByteArray(file);
        ByteArrayResource resource=new ByteArrayResource(fileContent);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("video/webm"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

    @RequestMapping(value = "/letter/lookupAllLetter", method = RequestMethod.GET)
    public ResponseEntity<?> lookupAllLetter(@RequestParam String name) throws IOException {
        Map<Boolean,Object> result = letterService.lookupAllLetter(name);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/letter/deleteLetter", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteLetter(@RequestParam int letter_id) {
        Map<Boolean,Object> result = letterService.deleteLetter(letter_id);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }


}
