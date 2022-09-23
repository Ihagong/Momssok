package com.example.demo.mapper;

import com.example.demo.dto.ImageDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface testmapper {
    int imageInsert(ImageDto Dto);

    ImageDto imageSelect(String imageName);
}
