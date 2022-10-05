package com.ihagong.momssok.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class UsageItemDto implements Serializable {
   private String startTime;
   private String endtTime;
   private String date;
   private long usageTime;
}
