package ru.neighbors.neighbors.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.neighbors.neighbors.dto.LoginUserDto;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.entities.User;
import ru.neighbors.neighbors.mappers.UserMapper;
import ru.neighbors.neighbors.repositories.UserRepository;

import javax.security.auth.login.LoginException;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Transactional
    public void createUser(RegistrationUserDto registrationUserDto) throws LoginException {
        User user = userMapper.registrationUserDtoToUser(registrationUserDto);
        if (userRepository.existsUserByLogin(user.getLogin())) {
            throw new LoginException();
        }
        log.debug(String.valueOf(user));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
