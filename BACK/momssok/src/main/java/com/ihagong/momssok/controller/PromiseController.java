package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.PromiseInputDto;
import com.ihagong.momssok.model.dto.PromiseInputItemDto;
import com.ihagong.momssok.service.PromiseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class PromiseController {
    private final PromiseService promiseService;
    @RequestMapping(value = "/promise/savePromise", method = RequestMethod.POST)
    public ResponseEntity<?> savePromise(@RequestBody PromiseInputDto promise) throws IOException {



        Map<Boolean,Object> result = promiseService.savePromise(promise);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }

    @RequestMapping(value = "/promise/lookupAllPromise", method = RequestMethod.GET)
    public ResponseEntity<?> lookupAllPromise(@RequestParam String name) throws IOException, ClassNotFoundException {


        Map<Boolean,Object> result = promiseService.lookupAllPromise(name);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }

    @RequestMapping(value = "/promise/updatePromise", method = RequestMethod.GET)
    public ResponseEntity<?> updatePromise(@RequestParam String name) throws IOException, ClassNotFoundException {


        Map<Boolean,Object> result = promiseService.updatePromise(name);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }
}
