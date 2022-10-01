package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalPartDto {
    private int id;
    private int animal_id;
    private String name;
    private String name_ko;
    private byte[] imageBytes;
}
