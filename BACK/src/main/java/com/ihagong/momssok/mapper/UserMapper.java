package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    UserApiDto searchByEmail(String email);
    UserAuthenticationDto searchByEmailAuth(String email);
    int registUser(UserDto dto);
    int registPassword(PasswordDto dto);

    int registEmailAuth(UserAuthenticationDto dto);
    int deleteEmailAuth(String email);

    PasswordDto findPassword(String email);

    int updatePassword(PasswordDto dto);

    int saveProfile(ProfileDto dto);

    List<ProfileDto> searchProfileList(String email);

    int checkExistProfileName(String email_name);

    UserDto searchUserDetail(String email);

    int updateUser(UserDto dto);

    int updateProfile(ProfileDto dto);

    int updateParentName(ProfileDto dto);

    int deleteUser(String email);

    int deleteProfile(String email_name);
}
