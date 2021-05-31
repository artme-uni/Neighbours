package ru.neighbors.neighbors.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.neighbors.neighbors.dto.LoginRequestUserDto;
import ru.neighbors.neighbors.dto.LoginResponseUserDto;
import ru.neighbors.neighbors.dto.NewRoomDto;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.entities.User;
import ru.neighbors.neighbors.mappers.UserMapper;
import ru.neighbors.neighbors.repositories.UserRepository;
import ru.neighbors.neighbors.services.exceptions.UserLoginExistsException;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoomService roomService;

    public UserService(UserRepository userRepository, UserMapper userMapper,
                       PasswordEncoder passwordEncoder, RoomService roomService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.roomService = roomService;
    }

    public void createUser(@NonNull RegistrationUserDto registrationUserDto) throws UserLoginExistsException {
        User user = userMapper.registrationUserDtoToUser(registrationUserDto);
        if (userRepository.existsUserByLogin(user.getLogin())) {
            throw new UserLoginExistsException("User with such login - " +
                    registrationUserDto.getLogin() + " - has already exited");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        System.out.println(user);
        roomService.addUserToHomeRoom(user);
        log.info("User has just successfully registered:{}", registrationUserDto);
    }

    public LoginResponseUserDto loginUser(@NonNull LoginRequestUserDto loginRequestUserDto) {
        User user = userRepository.findUserByLogin(loginRequestUserDto.getLogin()).orElseThrow();
        log.info("User from repository was downloaded:{}", user);
        LoginResponseUserDto loginResponseUserDto = userMapper.userToLoginResponseUserDto(user);
        var encodingInfo = loginRequestUserDto.getLogin() + ":" + loginRequestUserDto.getPassword();
        var token = Base64.getEncoder().encodeToString(encodingInfo.getBytes(StandardCharsets.UTF_8));
        loginResponseUserDto.setToken(token);
        log.info("Token for user:{}", token);
        return loginResponseUserDto;
    }
}
