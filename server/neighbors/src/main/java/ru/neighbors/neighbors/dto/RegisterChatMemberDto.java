package ru.neighbors.neighbors.dto;

import lombok.Data;

@Data
public class RegisterChatMemberDto {
    private long roomId;
    private String login;
}
