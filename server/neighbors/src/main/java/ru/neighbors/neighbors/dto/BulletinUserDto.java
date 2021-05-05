package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BulletinUserDto {
    private String firstName;
    private String lastName;
    private String login;
}
