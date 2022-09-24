package com.ihagong.momssok.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable() // rest api이므로 기본설정 미사용
                .csrf().disable() // rest api이므로 csrf 보안 미사용
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt로 인증하므로 세션 미사용
                .and()
                .authorizeRequests()
                .antMatchers("/user/signUp").hasRole("EMAILCONFIRM")
                .antMatchers("/user/emailCertification").permitAll()
                .antMatchers("/user/test").permitAll()
                .antMatchers("/user/saveProfile").hasRole("USER")
                .antMatchers("/user/lookupAllprofile").hasRole("USER")
                .antMatchers("/user/detailUser").hasRole("USER")
                .antMatchers("/user/updateUser").hasRole("USER")
                .antMatchers("/user/deleteUser").hasRole("USER")
                .antMatchers("/user/updateUser").hasRole("USER")
                .antMatchers("/letter/sendLetter").hasRole("USER")
                .antMatchers("/letter/lookupLetter").hasRole("USER")
                .antMatchers("/letter/getVideo").hasRole("USER")
                .antMatchers("/letter/lookupAllLetter").hasRole("USER")
                .antMatchers("/promise/savePromise").hasRole("USER")
                .antMatchers("/promise/lookupAllPromise").hasRole("USER")
                .antMatchers("/promise/updatePromise").hasRole("USER")
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class); // jwt 필터 추가
    }
//.anyRequest().authenticated()


}