package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class BulletinUserDto {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Email
    private String login;
}
