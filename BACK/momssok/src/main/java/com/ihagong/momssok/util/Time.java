package com.ihagong.momssok.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class Time {
    public static Date getTime() throws ParseException {
        SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        isoFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        Date date = isoFormat.parse(new Date().toString());
        return date;
    }
}
