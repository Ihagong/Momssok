package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalPartImageDto {
    private int id;
    private int animal_part_id;
    private String email_name;
    private byte[] image;
}
