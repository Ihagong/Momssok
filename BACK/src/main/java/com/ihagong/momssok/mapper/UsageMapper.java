package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.*;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UsageMapper {

   int updateLastAccess(UsageDBDto dto);

   UsageDBDto searchUsageDBDto(UsageDBDto dto);
   int checkUsageTimeExist(UsageDBDto dto);

   int registUsageTime(UsageDBDto dto);

   int updateUsageTime(UsageDBDto dto);
}
