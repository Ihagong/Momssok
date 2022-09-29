package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.UserMapper;
import com.ihagong.momssok.model.dto.*;
import com.ihagong.momssok.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;
    @Autowired
    private JavaMailSender javaMailSender;
    @Transactional
    public Map<Boolean,Object> signUp(UserApiDto requestDto){
        //validateDuplicated(requestDto.getEmail());
        Map<Boolean,Object> result=new HashMap<>();
        Map<String,String> resultBody = new HashMap<>();
        UserApiDto user=requestDto;
        user.setPassword(new BCryptPasswordEncoder().encode(requestDto.getPassword()));
        //해당 이메일 계정 중복 검사
        if(userMapper.searchByEmail(requestDto.getEmail())==null) {
            //인증받은 이메일 주소와 입력된 이메일 주소가 같을 때 등록
            if(requestDto.getEmail().equals(SecurityContextHolder.getContext().getAuthentication().getName())){
                UserDto userDto = new UserDto();
                userDto.setEmail(user.getEmail());
                userDto.setUsername(user.getUsername());
                userDto.setCreated_date(new Date());
                userMapper.registUser(userDto);
                PasswordDto passwordDto = new PasswordDto();
                passwordDto.setEmail(user.getEmail());
                passwordDto.setPassword(user.getPassword());
                userMapper.registPassword(passwordDto);
                userMapper.deleteEmailAuth(user.getEmail());
                //부모 프로필 생성
                ProfileDto parent = new ProfileDto();
                parent.setIs_parent(true);
                parent.setName(user.getUsername());
                parent.setEmail(user.getEmail());
                parent.setEmail_name(user.getEmail()+"_"+user.getUsername());
                parent.setCreated_date(new Date());
                userMapper.saveProfile(parent);
                resultBody.put("Messege","회원가입 성공");
                result.put(true,resultBody);
                return result;
            }
            else{
                //인증받은 이메일 주소와 입력된 이메일 주소가 일치하지 않음
                resultBody.put("Messege","인증받은 이메일 주소와 입력한 이메일 주소가 일치하지 않습니다.");
                result.put(false,resultBody);
                return result;
            }
        }
        else{
            //이미 가입된 회원
            resultBody.put("Messege","이미 가입된 이메일입니다.");
            result.put(false,resultBody);
            return result;
        }

        //return new MemberDto(user.getId(), user.getEmail());
    }

    public Map<Boolean,Object> emailInput(String email){
        UserAuthenticationDto userAuth = userMapper.searchByEmailAuth(email);
        UserApiDto user= userMapper.searchByEmail(email);
        Map<Boolean,Object> result=new HashMap<>();
        Map<String,String> resultBody = new HashMap<>();
        if(userAuth!=null){
            resultBody.put("Messege","이미 해당 메일로 인증번호가 발송되었습니다.");
            result.put(false,resultBody);
            return result;
        }
        else{
            if(user==null){
                String code = String.format("%04d", (int)(Math.random()*10000));
                userAuth=new UserAuthenticationDto();
                userAuth.setEmail(email);
                userAuth.setCode(code);
                userMapper.registEmailAuth(userAuth);

                //이메일 발송부분
                //JavaMailSender javaMailSender=new JavaMailSenderImpl();
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setSubject("맘쏙 인증번호");
                message.setText("인증번호는 "+code+" 입니다.");
                javaMailSender.send(message);
                resultBody.put("Messege","이메일로 인증번호가 발송되었습니다.");
                result.put(true,resultBody);
                return result;
            }
            else{
                resultBody.put("Messege","이미 등록된 이메일입니다.");
                result.put(false,resultBody);
                return result;
            }

        }
    }

    public Map<Boolean,Object> emailCertification(UserAuthenticationDto requestDto){
        Map<Boolean,Object> result=new HashMap<>();
        Map<String,String> resultBody = new HashMap<>();
        //해당 이메일에 대하여 db에 있는 인증번호와 일치하면
        UserAuthenticationDto dto2 = userMapper.searchByEmailAuth(requestDto.getEmail());
        if(dto2==null){
            resultBody.put("Messege","인증 테이블에 일치하는 이메일이 없습니다.");
            result.put(false,resultBody);
            return result;
        }
        if(requestDto.getCode().equals(dto2.getCode())){
            //계정 생성용 인증토큰 생성해서 반환
            resultBody.put("Messege","인증 성공");
            resultBody.put("token",jwtTokenProvider.createToken(requestDto.getEmail(), Collections.singletonList("ROLE_EMAILCONFIRM")));
            result.put(true,resultBody);
            return result;
        }
        resultBody.put("Messege","인증코드가 일치하지 않습니다.");
        result.put(false,resultBody);
        return result;
    }

    public Map<Boolean,Object> login(UserApiDto requestDto){
        Map<Boolean,Object> result=new HashMap<>();
        Map<String,String> resultBody = new HashMap<>();
        UserApiDto user = userMapper.searchByEmail(requestDto.getEmail());
        if(user!=null) {
            if (!new BCryptPasswordEncoder().matches(requestDto.getPassword(), user.getPassword())){
                resultBody.put("Messege","비밀번호가 일치하지 않습니다.");
                result.put(false,resultBody);
                return result;
            }
            resultBody.put("Messege","로그인 성공");
            resultBody.put("token",jwtTokenProvider.createToken(requestDto.getEmail(), Collections.singletonList("ROLE_USER")));
            result.put(true,resultBody);
            return result;
            //return new UserApiDto(user.getEmail(), jwtTokenProvider.createToken(requestDto.getEmail(), Collections.singletonList("ROLE_USER")) );
        }
        else{
            resultBody.put("Messege","이메일 주소가 일치하지 않습니다.");
            result.put(false,resultBody);
            return result;
        }

    }

    public Map<Boolean,Object> checkPassword(UserApiDto requestDto){
        Map<Boolean,Object> result=new HashMap<>();
        Map<String,String> resultBody = new HashMap<>();
        UserApiDto user = userMapper.searchByEmail(requestDto.getEmail());
        if(user!=null) {
            if (!new BCryptPasswordEncoder().matches(requestDto.getPassword(), user.getPassword())){
                resultBody.put("Messege","비밀번호가 일치하지 않습니다.");
                result.put(false,resultBody);
                return result;
            }
            resultBody.put("Messege","비밀번호가 일치합니다.");
            result.put(true,resultBody);
            return result;
            //return new UserApiDto(user.getEmail(), jwtTokenProvider.createToken(requestDto.getEmail(), Collections.singletonList("ROLE_USER")) );
        }
        else{
            resultBody.put("Messege","이메일 주소가 일치하지 않습니다.");
            result.put(false,resultBody);
            return result;
        }

    }

    public Map<Boolean,Object> findPassword(String email) {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, String> resultBody = new HashMap<>();
        PasswordDto pass = userMapper.findPassword(email);
        if(pass!=null){
            String code = String.format("%06d", (int)(Math.random()*1000000));
            PasswordDto passwordDto = new PasswordDto();
            passwordDto.setEmail(email);
            passwordDto.setPassword(new BCryptPasswordEncoder().encode(code));
            userMapper.updatePassword(passwordDto);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("맘쏙 임시 비밀번호");
            message.setText("임시 비밀번호는 "+code+" 입니다.");
            javaMailSender.send(message);

            resultBody.put("Messege","이메일로 임시 비밀번호가 전송되었습니다.");
            result.put(true,resultBody);
            return result;
        }
        else{
            resultBody.put("Messege","입력하신 이메일 주소가 존재하지 않습니다.");
            result.put(false,resultBody);
            return result;
        }
    }
    public Map<Boolean,Object> detailUser() {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto dto = userMapper.searchUserDetail(email);
        System.out.println(email);
        resultBody.put("user",dto);
        result.put(true,resultBody);
        return result;
    }

    public Map<Boolean,Object> updateUser(UserApiDto requestDto) throws ParseException {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, String> resultBody = new HashMap<>();
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        if(email!=null) {
            String str="";
            if(requestDto.getUsername()!=null) {
                UserDto user = new UserDto();
                user.setEmail(email);
                user.setUsername(requestDto.getUsername());
                user.setModified_date(new Date());
                userMapper.updateUser(user);
                ProfileDto profile = new ProfileDto();
                profile.setEmail(email);
                profile.setName(requestDto.getUsername());
                profile.setEmail_name(email + "_" + requestDto.getUsername());
                userMapper.updateParentName(profile);
                str+="이름 ";
            }
            if(requestDto.getPassword()!=null) {
                PasswordDto password = new PasswordDto();
                password.setPassword(new BCryptPasswordEncoder().encode(requestDto.getPassword()));
                password.setEmail(email);
                userMapper.updatePassword(password);
                str+="비밀번호 ";


            }
            resultBody.put("Messege", str+"수정 완료");
            result.put(true, resultBody);
            return result;
        }
        else{
            resultBody.put("Messege", "토큰이 유효하지 않습니다.");
            result.put(true, resultBody);
            return result;
        }
    }
    public Map<Boolean,Object> deleteUser() {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, String> resultBody = new HashMap<>();
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        if(userMapper.deleteUser(email)==1) {
            resultBody.put("Messege", "회원 탈퇴 되었습니다.");
            result.put(true, resultBody);
            return result;
        }
        else{
            resultBody.put("Messege", "회원 탈퇴 오류");
            result.put(false, resultBody);
            return result;
        }
    }

    public Map<Boolean,Object> saveProfile(ProfileDto requestDto) throws IOException {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, String> resultBody = new HashMap<>();
        if(userMapper.checkExistProfileName(requestDto.getEmail_name())==0){
            /*
            String path="C:\\Users\\multicampus\\Documents\\fileTest\\";
            UUID uuid = UUID.randomUUID();
            String filepath=path+ uuid +"_"+file.getOriginalFilename();
            file.transferTo(new File(filepath));
            requestDto.setImage_path(filepath);
             */
            userMapper.saveProfile(requestDto);

            resultBody.put("Messege","프로필 저장 완료");
            result.put(true,resultBody);
            return result;
        }
        else{
            resultBody.put("Messege","이미 해당 이름의 프로필이 존재합니다.");
            result.put(false,resultBody);
            return result;
        }
    }
    public Map<Boolean,Object> lookupAllprofile() throws IOException {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        String email=SecurityContextHolder.getContext().getAuthentication().getName();

        List<ProfileDto> profileList=userMapper.searchProfileList(email);
        if(profileList.size()>=1){
            List<ProfileApiDto> profileApiList=new LinkedList<>();
            for(ProfileDto profileDto:profileList){
                ProfileApiDto profileApiDto = new ProfileApiDto();
                profileApiDto.setEmail(profileDto.getEmail());
                profileApiDto.setName(profileDto.getName());
                profileApiDto.setBirthday(profileDto.getBirthday());
                profileApiDto.setCreated_date(profileDto.getCreated_date());
                profileApiDto.setModified_date(profileDto.getModified_date());
                profileApiDto.setIs_parent(profileDto.getIs_parent());
                profileApiDto.setProfile_password(profileDto.getProfile_password());
                profileApiDto.setImage_num(profileDto.getImage_num());
                /*
                if(profileDto.getImage_path()!=null) {
                    byte[] fileContent = FileUtils.readFileToByteArray(new File(profileDto.getImage_path()));
                    String encodedString = Base64.getEncoder().encodeToString(fileContent);
                    profileApiDto.setImage_base64(encodedString);
                }

                 */
                profileApiList.add(profileApiDto);
            }
            resultBody.put("profiles",profileApiList);
            result.put(true,resultBody);
            return result;
        }
        else{
            resultBody.put("Messege","프로필이 존재하지 않습니다.");
            result.put(false,resultBody);
            return result;
        }


    }

    public Map<Boolean,Object> updateProfile(ProfileDto requestDto,String beforeName) throws IOException {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        /*
        String path="C:\\Users\\multicampus\\Documents\\fileTest\\";
        UUID uuid = UUID.randomUUID();
        String filepath=path+ uuid +"_"+file.getOriginalFilename();
        file.transferTo(new File(filepath));
        requestDto.setImage_path(filepath);

         */
        requestDto.setBeforeName(beforeName);
        if(userMapper.updateProfile(requestDto)==1) {
            resultBody.put("Messege","프로필이 수정되었습니다.");
            result.put(true,resultBody);
            return result;
        }
        else{
            resultBody.put("Messege","프로필 수정 오류");
            result.put(false,resultBody);
            return result;
        }
    }
    public Map<Boolean,Object> deleteProfile(String name)  {
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        if(userMapper.deleteProfile(email+"_"+name)==1) {
            resultBody.put("Messege", "프로필이 삭제되었습니다.");
            result.put(true, resultBody);
            return result;
        }
        else{
            resultBody.put("Messege", "프로필 삭제 오류");
            result.put(false, resultBody);
            return result;
        }

    }
}
