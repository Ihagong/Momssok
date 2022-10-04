package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.*;
import com.ihagong.momssok.service.PromiseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.ContentCachingRequestWrapper;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class PromiseController {
    private final PromiseService promiseService;
    private final ObjectMapper objectMapper;

    @RequestMapping(value = "/promise/savePromise", method = RequestMethod.POST)
    public ResponseEntity<?> savePromise(@RequestBody PromiseInputDto promise) throws IOException {

        Map<Boolean,Object> result = promiseService.savePromise(promise);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }

    @RequestMapping(value = "/promise/savePromise2", method = RequestMethod.POST)
    public ResponseEntity<?> savePromise2(@RequestParam String name,@RequestParam List<String> inputs) throws IOException {
        List<PromiseInputItemDto> todoList=new ArrayList<>();

        for(String input:inputs){
            String[] input_split=input.split("&");
            PromiseInputItemDto dto=new PromiseInputItemDto();
            dto.setIndex1(input_split[0]);
            dto.setIndex2(input_split[1]);
            String s2="";
            for(int i=0;i<input_split.length;i++){
                if(i>=2&&i<input_split.length-1){
                    s2+=input_split[i];
                }
            }
            dto.setTodo(s2);
            dto.setGift(input_split[input_split.length-1]);
            todoList.add(dto);
            System.out.println(dto.getIndex1());
            System.out.println(dto.getIndex2());
            System.out.println(dto.getTodo());
            System.out.println(dto.getGift());
        }
        Map<Boolean,Object> result = promiseService.savePromise2(name,todoList);
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

    @RequestMapping(value = "/promise/updatePromise", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePromise(@RequestParam String name,@RequestParam String index,@RequestParam String newTodo,@RequestParam(required = false) String gift) throws IOException, ClassNotFoundException {


        Map<Boolean,Object> result = promiseService.updatePromise(name,index,newTodo,gift);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }
    @RequestMapping(value = "/promise/deletePromise", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePromise(@RequestParam String name,@RequestParam String index) throws IOException, ClassNotFoundException {


        Map<Boolean,Object> result = promiseService.deletePromise(name,index);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }
    @RequestMapping(value = "/promise/donePromise", method = RequestMethod.PUT)
    public ResponseEntity<?> donePromise(@RequestParam String name,@RequestParam String index) throws IOException, ClassNotFoundException {


        Map<Boolean,Object> result = promiseService.donePromise(name,index);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }


}
