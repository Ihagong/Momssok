package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.testImageDto;
import com.ihagong.momssok.service.LetterService;
import com.ihagong.momssok.service.TestService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class TestController {
    private final TestService testService;
//    @RequestMapping(value = "/testEmotion", method = RequestMethod.GET)
//    public ResponseEntity<?> testEmotion(@RequestParam String  text) throws IOException, SQLException {
//        Map<Boolean,Object> result = testService.ApiTestEmotion(text);
//        if(result.get(true)!=null)
//            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
//        else
//            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
//    }


//    @RequestMapping(value = "/testDetection", method = RequestMethod.GET)
//    public ResponseEntity<?> testDetection2(@RequestBody testImageDto dto) throws IOException {
//        Map<Boolean,Object> result = testService.ApiTestDetection(dto);
//        if(result.get(true)!=null)
//            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
//        else
//            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
//    }

/*
    @RequestMapping(value = "/testDetection", method = RequestMethod.GET)
    public ResponseEntity<?> testDetection(@RequestParam MultipartFile file) throws IOException {
        Map<Boolean,Object> result = testService.ApiTestDetection(file);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

 */
}
