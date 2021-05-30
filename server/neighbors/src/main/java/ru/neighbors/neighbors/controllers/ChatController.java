package ru.neighbors.neighbors.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.services.RoomService;
import ru.neighbors.neighbors.services.exceptions.ChatMemberException;

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

    @PostMapping("/newChatMember")
    public @ResponseBody
    ResponseEntity<Object> registerNewChatMember(@RequestBody ChatMemberLoginDto chatMemberDto) {
        log.info("Request to register new member:{}", chatMemberDto);
        try {
            return ResponseEntity.ok(roomService.registerNewChatMember(chatMemberDto));
        } catch (ChatMemberException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/removeChatMember")
    public @ResponseBody
    ResponseEntity<Object> removeChatMember(@RequestBody ChatMemberLoginDto chatMemberDto) {
        log.info("Request to remove member:{}", chatMemberDto);
        try {
            return ResponseEntity.ok(roomService.removeChatMember(chatMemberDto));
        } catch (ChatMemberException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
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
