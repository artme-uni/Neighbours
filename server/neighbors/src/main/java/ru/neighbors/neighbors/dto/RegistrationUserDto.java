package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.neighbors.neighbors.validators.annotations.ValidPassword;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class RegistrationUserDto {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    private String middleName;
    @NotBlank
    private String city;
    @NotBlank
    private String street;
    @Min(value = 1)
    private Integer houseNumber;
    @Email
    private String login;
    @ValidPassword
    private String password;
}
