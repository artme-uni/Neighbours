package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private long id;

    private String firstName;
    private String lastName;
    private String middleName;
    private String login;
}
