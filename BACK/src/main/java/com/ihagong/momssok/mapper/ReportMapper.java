package com.ihagong.momssok.mapper;

import com.ihagong.momssok.model.dto.ReportDto;
import com.ihagong.momssok.model.dto.ReportInputDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface ReportMapper {
    ReportDto lookupDaily(ReportInputDto reportInput) throws SQLException;
    List<ReportDto> lookupWeekly(ReportInputDto reportInput) throws SQLException;
    List<ReportDto> lookupMonthly(ReportInputDto reportInput) throws SQLException;

    List<ReportDto> lookupAll(ReportInputDto reportInput) throws SQLException;
}
