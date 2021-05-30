package ru.neighbors.neighbors.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.services.RoomService;

import java.security.Principal;
import java.util.List;

@Controller
@Slf4j
@CrossOrigin
public class ChatController {
    private final RoomService roomService;

    public ChatController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/chat/roomList")
    public List<SimpleRoomDto> getRoomList(Principal principal) {
        return roomService.getRoomList(principal.getName());
    }

    @PostMapping("/users")
    public List<UserRoomDto> getUserList(AddressDto addressDto) {
        return roomService.getUsersByAddress(addressDto);
    }

    @MessageMapping("/chat/addRoom")
    @SendTo("/chat/newRoom")
    public SimpleRoomDto createRoom(@RequestBody NewRoomDto newRoomDto) {
        log.info("Request to create new room:{}", newRoomDto);
        return roomService.createRoom(newRoomDto);
    }

    @MessageMapping("/chat/{roomId}/join")
    @SendTo("/chat/{roomId}/join")
    public RoomDto joinRoom(@RequestBody UserRoomKeyDto userRoomKey) {
        log.info("Request to open room:{}", userRoomKey);
        return roomService.joinRoom(userRoomKey);
    }

    @MessageMapping("/chat/{roomId}/leave")
    public RoomDto removeUserFromRoom(@RequestBody UserRoomKeyDto userRoomKey) {
        log.info("Request to remove user from room:{}", userRoomKey);
        return roomService.removeUserFromRoom(userRoomKey);
    }

    @MessageMapping("/chat/{roomId}/sendMessage")
    public void sendMessage(@DestinationVariable Long roomId, @RequestBody MessageDto messageDto) {
        log.info("Request to remove user from room(roomId={}):{}", roomId, messageDto);
        roomService.sendMessageDtoToMessages(roomId, messageDto);
    }
}
