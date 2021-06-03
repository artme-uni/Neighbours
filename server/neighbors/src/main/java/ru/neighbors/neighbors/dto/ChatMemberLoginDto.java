package ru.neighbors.neighbors.dto;

import lombok.Data;

@Data
public class ChatMemberLoginDto {
    private long roomId;
    private String login;
}
