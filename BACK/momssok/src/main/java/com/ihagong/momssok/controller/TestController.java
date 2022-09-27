package com.ihagong.momssok.controller;

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
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class TestController {
    private final TestService testService;
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<?> ApiTest(@RequestParam String  text) throws IOException {
        Map<Boolean,Object> result = testService.ApiTest(text);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }



}
