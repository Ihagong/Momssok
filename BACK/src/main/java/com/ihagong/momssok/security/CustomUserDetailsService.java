package com.ihagong.momssok.security;

import com.ihagong.momssok.mapper.UserMapper;
import com.ihagong.momssok.model.dto.UserApiDto;
import com.ihagong.momssok.model.dto.UserAuthenticationDto;
import com.ihagong.momssok.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    //private final UsersRepository usersRepository;
    private final UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserApiDto user = userMapper.searchByEmail(username);
        if(user==null){
            List<GrantedAuthority> authorites = new ArrayList<GrantedAuthority>();
            authorites.add(new SimpleGrantedAuthority("ROLE_EMAILCONFIRM"));
            UserAuthenticationDto user1 = userMapper.searchByEmailAuth(username);
            User user2 = new User(user1.getEmail(), "pass", authorites);
            return user2;
        }
        List<GrantedAuthority> authorites = new ArrayList<GrantedAuthority>();
        authorites.add(new SimpleGrantedAuthority("ROLE_USER"));
//        if(user!=null){
//            authorites.add(new SimpleGrantedAuthority(user.getRoles()));
//            user.setAuthorities(authorities);
//     }
        User user2 = new User(user.getEmail(), user.getPassword(), authorites);
        return user2;
    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
//    private UserDetails createUserDetails(Users users) {
//        return new User(users.getUsername(), users.getPassword(), users.getAuthorities());
//    }
}