package com.ihagong.momssok.service;

import com.ihagong.momssok.model.dto.ReportDto;
import com.ihagong.momssok.model.dto.ReportInputDto;

import java.util.List;

public interface ReportService {
    ReportDto lookupDaily(ReportInputDto reportInput) throws Exception;
    List<ReportDto> lookupWeekly(ReportInputDto reportInput) throws Exception;
    List<ReportDto> lookupMonthly(ReportInputDto reportInput) throws Exception;

    List<ReportDto> lookupAll(ReportInputDto reportInput) throws Exception;
}
