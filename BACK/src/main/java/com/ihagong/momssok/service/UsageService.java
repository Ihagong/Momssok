package com.ihagong.momssok.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ihagong.momssok.mapper.UsageMapper;
import com.ihagong.momssok.model.dto.EmotionSaveDto;
import com.ihagong.momssok.model.dto.UsageDto;
import com.ihagong.momssok.model.dto.testImageDto;
import com.ihagong.momssok.util.BASE64DecodedMultipartFile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UsageService {
    private final UsageMapper usageMapper;
    public Map<Boolean,Object> LastAccess(String name)  {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<Boolean, Object> result = new HashMap<>();
        Map<String, Object> resultBody = new HashMap<>();
        UsageDto dto = new UsageDto();
        dto.setDate(new Date());
        dto.setEmail_name(email+"_"+name);
        usageMapper.updateLastAccess(dto);

        resultBody.put("status", "SUCCESS");
        result.put(true, resultBody);
        return result;

    }


}
