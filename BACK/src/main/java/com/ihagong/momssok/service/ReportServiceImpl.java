package com.ihagong.momssok.service;

import com.ihagong.momssok.mapper.ReportMapper;
import com.ihagong.momssok.model.dto.DiaryDayDto;
import com.ihagong.momssok.model.dto.DiaryDto;
import com.ihagong.momssok.model.dto.ReportDto;
import com.ihagong.momssok.model.dto.ReportInputDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final ReportMapper reportMapper;

    @Override
    public ReportDto lookupDaily(ReportInputDto reportInput) throws Exception {
        return reportMapper.lookupDaily(reportInput);
    }

    @Override
    public List<ReportDto> lookupWeekly(ReportInputDto reportInput) throws Exception {
        return reportMapper.lookupWeekly(reportInput);
    }

    @Override
    public List<ReportDto> lookupMonthly(ReportInputDto reportInput) throws Exception {
        return reportMapper.lookupMonthly(reportInput);
    }

    @Override
    public List<ReportDto> lookupAll(ReportInputDto reportInput) throws Exception {
        return reportMapper.lookupAll(reportInput);
    }
}
