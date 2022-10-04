package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.PromiseInnerItemDto;
import com.ihagong.momssok.model.dto.PromiseInputDto;
import com.ihagong.momssok.model.dto.PromiseItemDto;
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
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class PromiseController {
    private final PromiseService promiseService;
    private final ObjectMapper objectMapper;
    @RequestMapping(value = "/promise/savePromise", method = RequestMethod.POST)
    public ResponseEntity<?> savePromise(@RequestBody(required = false) PromiseInputDto promise) throws IOException {
        if(promise.getName()!=null)
        System.out.println(promise.getName());
        if(promise.getPromiseItems()!=null) {
            for (PromiseItemDto item : promise.getPromiseItems()) {
                for (PromiseInnerItemDto inner : item.getTodoList())
                    System.out.println(inner.getTodo());
            }
        }
        /*
        Map<Boolean,Object> result = promiseService.savePromise(promise);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
*/
        return new ResponseEntity<>("test", HttpStatus.OK);

    }
    /*
    @RequestMapping(value = "/promise/savePromise2", method = RequestMethod.POST)
    public ResponseEntity<?> savePromise2(@RequestParam String name,@RequestParam PromiseInputDto todo) throws IOException {
        System.out.println(promise.getName());
        for (PromiseItemDto item:promise.getPromiseItems()){
            for (PromiseInnerItemDto inner:item.getTodoList())
                System.out.println(inner.getTodo());
        }
        Map<Boolean,Object> result = promiseService.savePromise(promise);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }*/
    @RequestMapping(value = "/promise/lookupAllPromise", method = RequestMethod.GET)
    public ResponseEntity<?> lookupAllPromise(@RequestParam String name) throws IOException, ClassNotFoundException {


        Map<Boolean,Object> result = promiseService.lookupAllPromise(name);

        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);


    }

    @RequestMapping(value = "/promise/updatePromise", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePromise(@RequestParam String name,@RequestParam String index,@RequestParam String newTodo) throws IOException, ClassNotFoundException {


        Map<Boolean,Object> result = promiseService.updatePromise(name,index,newTodo);

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
