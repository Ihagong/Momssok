package com.ihagong.momssok.controller;

import com.ihagong.momssok.model.dto.*;
import com.ihagong.momssok.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    @RequestMapping(value = "/user/signUp", method = RequestMethod.POST)
    public ResponseEntity<?> signUp(@RequestBody UserApiDto dto) { //이메일 인증 성공한 토큰 헤더에 있어야 접근 가능
        Map<Boolean,Object> result = userService.signUp(dto);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/user/emailCertification", method = RequestMethod.POST)
    public ResponseEntity<?> emailCertification(@RequestBody UserAuthenticationDto dto) {
        Map<Boolean,Object> result = userService.emailCertification(dto);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/user/emailInput", method = RequestMethod.POST)
    public ResponseEntity<?> emailInput(@RequestParam String email) {
        Map<Boolean,Object> result = userService.emailInput(email);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody UserApiDto dto) {
        Map<Boolean,Object> result = userService.login(dto);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user/findPassword", method = RequestMethod.GET)
    public ResponseEntity<?> findPassword(@RequestParam String email) {
        Map<Boolean,Object> result = userService.findPassword(email);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user/detailUser", method = RequestMethod.GET)
    public ResponseEntity<?> detailUser() {
        Map<Boolean,Object> result = userService.detailUser();
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user/updateUser", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@RequestBody UserApiDto requestDto) {
        Map<Boolean,Object> result = userService.updateUser(requestDto);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user/deleteUser", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser() {
        Map<Boolean,Object> result = userService.deleteUser();
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user/saveProfile", method = RequestMethod.POST)
    public ResponseEntity<?> saveProfile(@RequestParam MultipartFile profileImage,@RequestParam String name,
                                         @RequestParam String birthday, @RequestParam String profile_password) throws IOException, ParseException {
        ProfileDto dto = new ProfileDto();
        dto.setEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        dto.setName(name);
        dto.setEmail_name(SecurityContextHolder.getContext().getAuthentication().getName()+"_"+name);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        Date date = formatter.parse(birthday);
        dto.setBirthday(date);
        dto.setProfile_password(profile_password);
        dto.setCreated_date(new Date());
        dto.setIs_parent(false);
        Map<Boolean,Object> result = userService.saveProfile(dto,profileImage);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user/lookupAllprofile", method = RequestMethod.GET)
    public ResponseEntity<?> lookupAllprofile() throws IOException {
        Map<Boolean,Object> result = userService.lookupAllprofile();
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }


    @RequestMapping(value = "/user/updateProfile", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProfile(@RequestParam MultipartFile profileImage,@RequestParam String name,
                                           @RequestParam String birthday, @RequestParam String profile_password,
                                           @RequestParam String beforeName) throws IOException, ParseException {
        ProfileDto dto = new ProfileDto();
        dto.setEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        dto.setName(name);
        dto.setEmail_name(SecurityContextHolder.getContext().getAuthentication().getName()+"_"+name);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        Date date = formatter.parse(birthday);
        dto.setBirthday(date);
        dto.setProfile_password(profile_password);
        dto.setModified_date(new Date());
        Map<Boolean,Object> result = userService.updateProfile(dto,profileImage,beforeName);
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }





    @Value("${spring.jwt.secretKey}")
    private String secretKey;
    @RequestMapping(value = "/user/test", method = RequestMethod.GET)
    public ResponseEntity<?> test(@RequestParam String token) {
        Jws<Claims> jws;
        //System.out.println(token);
        String value = null;
        try{
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey.getBytes())
                    .parseClaimsJws(token).getBody();
            value = (String)claims.getSubject();
            //System.out.println(claims.get("roles"));
            System.out.println(claims);
            System.out.println(  SecurityContextHolder.getContext().getAuthentication().getName());
        } catch (JwtException ex) {   // (5)

        }
        
        return  ResponseEntity.ok(value);
    }

}
