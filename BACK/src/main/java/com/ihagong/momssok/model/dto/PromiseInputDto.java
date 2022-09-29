package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PromiseInputDto {
    private String name;
    private List<PromiseItemDto> promiseItems;
}
