package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.neighbors.neighbors.validators.annotations.ValidPassword;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
public class LoginRequestUserDto {
    @Email
    private String login;
    @ValidPassword
    private String password;
}
