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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    @RequestMapping(value = "/user/signUp", method = RequestMethod.POST)
    public ResponseEntity<?> signUp(@RequestBody UserApiDto dto)  { //이메일 인증 성공한 토큰 헤더에 있어야 접근 가능
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

    @RequestMapping(value = "/user/checkPassword", method = RequestMethod.GET)
    public ResponseEntity<?> checkPassword(@RequestBody UserApiDto dto) {
        Map<Boolean,Object> result = userService.checkPassword(dto);
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
    public ResponseEntity<?> updateUser(@RequestBody UserApiDto requestDto) throws ParseException {
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
    public ResponseEntity<?> saveProfile(@RequestBody ProfileDto requestDto) throws IOException, ParseException {
        ProfileDto dto = new ProfileDto();
        dto.setEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        dto.setName(requestDto.getName());
        dto.setEmail_name(SecurityContextHolder.getContext().getAuthentication().getName()+"_"+requestDto.getName());
        //SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        //Date date = formatter.parse(birthday);
        dto.setBirthday(requestDto.getBirthday());
        dto.setProfile_password(requestDto.getProfile_password());
        dto.setCreated_date(new Date());
        dto.setIs_parent(false);
        dto.setImage_num(requestDto.getImage_num());
        Map<Boolean,Object> result = userService.saveProfile(dto);
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
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDto requestDto) throws IOException, ParseException {
        ProfileDto dto = new ProfileDto();
        dto.setEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        dto.setName(requestDto.getName());
        dto.setEmail_name(SecurityContextHolder.getContext().getAuthentication().getName()+"_"+requestDto.getName());
        //SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
       // Date date = formatter.parse(birthday);
        dto.setBirthday(requestDto.getBirthday());
        dto.setProfile_password(requestDto.getProfile_password());
        dto.setModified_date(new Date());
        System.out.println(dto.getModified_date());
        dto.setImage_num(requestDto.getImage_num());
        Map<Boolean,Object> result = userService.updateProfile(dto,requestDto.getBeforeName());
        if(result.get(true)!=null)
            return new ResponseEntity<>(result.get(true), HttpStatus.OK);
        else
            return new ResponseEntity<>(result.get(false), HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user/deleteProfile", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProfile(@RequestParam String name) {
        Map<Boolean,Object> result = userService.deleteProfile(name);
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
