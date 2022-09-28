package com.ihagong.momssok.service;

import com.ihagong.momssok.model.dto.DiaryDayDto;
import com.ihagong.momssok.model.dto.DiaryDto;

import java.util.List;

public interface DiaryService {

    List<DiaryDto> lookupCalender(DiaryDayDto diary) throws Exception;
    List<DiaryDto> lookupGallery(String email_name) throws Exception;
}
