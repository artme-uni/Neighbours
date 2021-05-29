package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SimpleRoomDto {
    private Long id;
    private String roomName;
}