package ru.neighbors.neighbors.controllers;

import io.swagger.annotations.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.neighbors.neighbors.dto.LoginRequestUserDto;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.services.UserService;

import javax.security.auth.login.LoginException;
import javax.validation.Valid;

@RestController
public class RegistrationController {
    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register")
    @ApiResponse(code = 409, message = "Username already exists")
    public ResponseEntity<Object> createUser(@Valid @RequestBody RegistrationUserDto registrationUserDto) {
        try {
            userService.createUser(registrationUserDto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (LoginException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginRequestUserDto loginRequestUserDto) {
        return ResponseEntity.ok(userService.loginUser(loginRequestUserDto));
    }
}
