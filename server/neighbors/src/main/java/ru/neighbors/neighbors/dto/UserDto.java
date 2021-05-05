package ru.neighbors.neighbors.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private long id;

    private String firstName;
    private String lastName;
    private String middleName;
    private String login;
}
