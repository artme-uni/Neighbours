package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRoomKeyDto {
    private long roomId;
    private String login;
    private String firstName;
    private String lastName;
}
