package com.ihagong.momssok.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DiaryController {

    private final String success = "SUCCESS";
    private final String fail = "FAIL";
    private final String error = "ERROR";



}
