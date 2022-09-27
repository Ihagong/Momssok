package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProfileDto {
    private String beforeName;
    private String email_name;
    private String email;
    private String name;
    private Date birthday;
    private String image_num;
    private String profile_password;
    private Date created_date;
    private Date modified_date;
    private Boolean is_parent;
}
