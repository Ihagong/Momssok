package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.AnimalImageInputDto;
import com.ihagong.momssok.service.AnimalService;
import com.ihagong.momssok.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class AnimalDictionaryController {
    private final AnimalService animalService;
    @RequestMapping(value = "/animal/lookupAlldictionary", method = RequestMethod.GET)
    public ResponseEntity<?> lookupAlldictionary(@RequestParam String name) throws IOException {
        Map<Boolean,Object> result = animalService.lookupAlldictionary(name);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/animal/inputPartImage", method = RequestMethod.PUT)
    public ResponseEntity<?> inputPartImage(@RequestBody AnimalImageInputDto requestDto) throws IOException {
        Map<Boolean,Object> result = animalService.inputPartImage(requestDto);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }
}
