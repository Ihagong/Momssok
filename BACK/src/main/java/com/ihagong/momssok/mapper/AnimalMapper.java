package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AnimalMapper {

   List<AnimalDto> searchAnimals();

   List<AnimalPartDto> searchAnimal_parts(int animal_id);

   AnimalPartImageDto searchAnimal_part_images(AnimalPartImageSearchParamsDto dto);
   int inputPartImage(AnimalPartImageDto dto);
}
