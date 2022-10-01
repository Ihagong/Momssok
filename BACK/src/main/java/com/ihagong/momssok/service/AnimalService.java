package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.AnimalMapper;
import com.ihagong.momssok.model.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnimalService {
    private final AnimalMapper animalMapper;
    public Map<Boolean,Object> lookupAlldictionary(String name)  {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        List<AnimalDto> animal_list=animalMapper.searchAnimals();
        List<AnimalApiDto> animal_api_list=new LinkedList<>();
        for(AnimalDto animal:animal_list){
            AnimalApiDto api = new AnimalApiDto();
            api.setId(animal.getId());
            api.setDescription(animal.getDescription());
            api.setName(animal.getName());
            api.setName_ko(animal.getName_ko());
            List<AnimalPartDto> part_list=animalMapper.searchAnimal_parts(animal.getId());
            for (AnimalPartDto part:part_list){
                AnimalPartImageSearchParamsDto searchParams = new AnimalPartImageSearchParamsDto();
                searchParams.setAnimal_part_id(part.getId());
                searchParams.setEmail_name(email+"_"+name);
                AnimalPartImageDto imageDto = animalMapper.searchAnimal_part_images(searchParams);
                if(imageDto!=null){
                    part.setImageBytes(imageDto.getImage());
                }

            }
            api.setParts(part_list);
            animal_api_list.add(api);
        }

        resultBody.put("animals",animal_api_list);
        result.put(true, resultBody);
        return result;


    }

    public Map<Boolean,Object> inputPartImage(AnimalImageInputDto dto)  {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        AnimalPartImageDto dto2=new AnimalPartImageDto();
        dto2.setImage(dto.getImage().getBytes());
        dto2.setEmail_name(email+"_"+dto.getName());
        dto2.setAnimal_part_id(dto.getAnimal_part_id());
        if(animalMapper.inputPartImage(dto2)==1){
            resultBody.put("messege","저장 완료");
            result.put(true, resultBody);
            return result;
        }
        else {
            resultBody.put("messege","저장 실패");
            result.put(false, resultBody);
            return result;
        }



    }
}
