package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponseUserDto {
    private String firstName;
    private String lastName;
    private String middleName;
    private String city;
    private String street;
    private Integer houseNumber;
    private String token;
}
