package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewRoomDto {
    private String roomName;
    private String city;
    private String street;
    private Integer houseNumber;
}
