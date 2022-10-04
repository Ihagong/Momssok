package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class testImageDto {
    private int drawing_id;
    private String imageBase64;
    private String name;
    private MultipartFile multipartFile;
    private List<String> list;
}
