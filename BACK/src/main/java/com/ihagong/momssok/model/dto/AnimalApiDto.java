package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AnimalApiDto {
   private int id;
   private String name;
    private String name_ko;
    private String description;
    private List<AnimalPartDto> parts;
}
