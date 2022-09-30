package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.PromiseDBDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PromiseMapper {
    int checkPromise(String email_name);
    int savePromise(PromiseDBDto dto);
    PromiseDBDto selectPromise(String email_name);
    int updatePromise(PromiseDBDto dto);

    int deletePromise(String email_name);
}
