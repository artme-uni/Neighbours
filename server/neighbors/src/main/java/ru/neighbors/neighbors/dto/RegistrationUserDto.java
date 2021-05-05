package ru.neighbors.neighbors.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class RegistrationUserDto {
    private String firstName;
    private String lastName;
    private String middleName;
    private String login;
    private String password;
}
