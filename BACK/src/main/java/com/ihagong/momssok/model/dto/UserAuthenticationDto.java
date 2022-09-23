package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAuthenticationDto {
    private String email;
    private String code;
}
