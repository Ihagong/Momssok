package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UsageMapper {

   int updateLastAccess(UsageDto dto);
}
