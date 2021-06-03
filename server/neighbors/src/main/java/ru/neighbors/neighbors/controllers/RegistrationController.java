package ru.neighbors.neighbors.controllers;

import io.swagger.annotations.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.neighbors.neighbors.dto.LoginRequestUserDto;
import ru.neighbors.neighbors.dto.LoginResponseUserDto;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.services.UserService;
import ru.neighbors.neighbors.services.exceptions.UserLoginExistsException;

import javax.validation.Valid;

@RestController
@CrossOrigin
@Slf4j
public class RegistrationController {
    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register")
    @ApiResponse(code = 409, message = "Username already exists")
    public ResponseEntity<Object> createUser(@Valid @RequestBody RegistrationUserDto registrationUserDto) {
        log.info("Request params:{}", registrationUserDto);
        try {
            userService.createUser(registrationUserDto);
            log.info("New user has just created");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserLoginExistsException e) {
            log.warn(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginRequestUserDto loginRequestUserDto) {
        log.info("Request params:{}", loginRequestUserDto);
        LoginResponseUserDto loginResponseUserDto = userService.loginUser(loginRequestUserDto);
        log.info("Response user dto:{}",loginResponseUserDto);
        return ResponseEntity.ok(loginResponseUserDto);
    }
}
