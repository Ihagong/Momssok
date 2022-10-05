package com.ihagong.momssok.controller;

import com.ihagong.momssok.service.TestService;
import com.ihagong.momssok.service.UsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class UsageController {
    private final UsageService usageService;
    @RequestMapping(value = "/user/lastAccess", method = RequestMethod.GET)
    public ResponseEntity<?> testEmotion(@RequestParam String  name){
        Map<Boolean,Object> result = usageService.LastAccess(name);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }


}
