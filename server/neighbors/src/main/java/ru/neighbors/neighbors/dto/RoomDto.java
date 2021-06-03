package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class RoomDto {
    private Long id;
    private String roomName;
    private Set<UserRoomDto> users;
    private Set<MessageDto> messages;
}
