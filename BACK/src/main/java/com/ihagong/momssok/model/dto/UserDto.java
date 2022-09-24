package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserDto {
    private String email;
    private String username;
    private Date created_date;
    private Date modified_date;
}
