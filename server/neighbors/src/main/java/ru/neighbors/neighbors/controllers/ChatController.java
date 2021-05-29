package ru.neighbors.neighbors.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.services.RoomService;

import java.util.List;

@Controller
@Slf4j
public class ChatController {
    private final RoomService roomService;
    private final SimpMessageSendingOperations messagingTemplate;

    public ChatController(RoomService roomService, SimpMessageSendingOperations messagingTemplate) {
        this.roomService = roomService;
        this.messagingTemplate = messagingTemplate;
    }

    @SubscribeMapping("/chat/roomList")
    public List<SimpleRoomDto> getRoomList(@RequestBody UserLoginDto userLoginDto) {
        return roomService.getRoomList(userLoginDto);
    }

    @MessageMapping("/chat/addRoom")
    @SendTo("/chat/newRoom")
    public SimpleRoomDto createRoom(@RequestBody NewRoomDto newRoomDto) {
        return roomService.createRoom(newRoomDto);
    }

    @MessageMapping("/chat/{roomId}/join")
    public RoomDto joinRoom(@RequestBody UserRoomKeyDto userRoomKey) {
        return roomService.joinRoom(userRoomKey);
    }

    @MessageMapping("/chat/{roomId}/leave")
    public RoomDto removeUserFromRoom(@RequestBody UserRoomKeyDto userRoomKey) {
        return roomService.removeUserFromRoom(userRoomKey);
    }

    @MessageMapping("chat/{roomId}/sendMessage")
    public void sendMessage(@DestinationVariable Long roomId, @RequestBody MessageDto messageDto) {
        roomService.sendMessageDtoToMessages(roomId, messageDto);
    }
}
