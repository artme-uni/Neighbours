package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class NewRoomDto {
    @NotBlank
    private String roomName;
    private String city;
    private String street;
    private Integer houseNumber;
}
