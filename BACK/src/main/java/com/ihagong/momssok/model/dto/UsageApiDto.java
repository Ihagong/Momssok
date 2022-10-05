package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UsageApiDto {
   private String email_name;
   private String date;
   private List<UsageItemDto> usageTimesList;
   private long total_usage_time;
}
