package ru.neighbors.neighbors.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChatMembersDto {
    private List<UserRoomDto> members;
}
