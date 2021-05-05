package ru.neighbors.neighbors.controllers;

import io.swagger.annotations.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.services.UserService;

import javax.security.auth.login.LoginException;

@RestController
public class RegistrationController {
    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register")
    @ApiResponse(code = 409, message = "username already exists")
    public ResponseEntity<Object> createUser(RegistrationUserDto registrationUserDto) {
        try {
            userService.createUser(registrationUserDto);
            return ResponseEntity.ok().build();
        } catch (LoginException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("username already exists");
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Object> loginUser() {
        return ResponseEntity.ok().build();
    }
}
