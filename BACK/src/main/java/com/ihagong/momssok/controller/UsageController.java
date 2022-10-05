package com.ihagong.momssok.controller;

import com.ihagong.momssok.service.TestService;
import com.ihagong.momssok.service.UsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class UsageController {
    private final UsageService usageService;
    @RequestMapping(value = "/user/lastAccess", method = RequestMethod.POST)
    public ResponseEntity<?> lastAccess(@RequestParam String  name){
        Map<Boolean,Object> result = usageService.LastAccess(name);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/user/Addtime", method = RequestMethod.POST)
    public ResponseEntity<?> Addtime(@RequestParam String  name,@RequestParam Date  startTime,@RequestParam Date  endTime) throws IOException, ClassNotFoundException {
        Map<Boolean,Object> result = usageService.Addtime(name,startTime,endTime);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/user/AddtimeInDate", method = RequestMethod.POST)
    public ResponseEntity<?> AddtimeInDate(@RequestParam String  name,@RequestParam Date  startTime,@RequestParam Date  endTime,@RequestParam Date date) throws IOException, ClassNotFoundException {
        Map<Boolean,Object> result = usageService.AddtimeInDate(name,date,startTime,endTime);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/user/lookupUsageTime", method = RequestMethod.GET)
    public ResponseEntity<?> lookupUsageTime(@RequestParam String  name,@RequestParam Date date) throws IOException, ClassNotFoundException {
        Map<Boolean,Object> result = usageService.lookupUsageTime(name,date);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

}
