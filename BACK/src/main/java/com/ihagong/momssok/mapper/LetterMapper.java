package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.LetterDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LetterMapper {

    int saveLetter(LetterDto dto);
    int userCheck(String email_name);

    List<LetterDto> searchletter(String send_to);
    LetterDto detailletter(int letter_id);
    int updateRead(int letter_id);

    int deleteLetter(int letter_id);
}
