package ru.neighbors.neighbors.services;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.entities.Message;
import ru.neighbors.neighbors.entities.MessageType;
import ru.neighbors.neighbors.entities.Room;
import ru.neighbors.neighbors.entities.User;
import ru.neighbors.neighbors.mappers.MessageMapper;
import ru.neighbors.neighbors.mappers.RoomMapper;
import ru.neighbors.neighbors.repositories.RoomRepository;
import ru.neighbors.neighbors.repositories.UserRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;
    private final UserRepository userRepository;
    private final MessageMapper messageMapper;
    private final SimpMessageSendingOperations messagingTemplate;

    public RoomService(RoomRepository roomRepository,
                       RoomMapper roomMapper,
                       UserRepository userRepository,
                       MessageMapper messageMapper,
                       SimpMessageSendingOperations messagingTemplate) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
        this.userRepository = userRepository;
        this.messageMapper = messageMapper;
        this.messagingTemplate = messagingTemplate;
    }

    public List<SimpleRoomDto> getRoomList(UserLoginDto userLoginDto) {
        User user = userRepository.findUserByLogin(userLoginDto.getLogin());
        return roomRepository.findByUsersContaining(user)
                .stream()
                .map(roomMapper::roomToSimpleRoomDto)
                .collect(Collectors.toList());
    }

    public SimpleRoomDto createRoom(NewRoomDto newRoomDto) {
        Room room = roomMapper.newRoomDtoToRoom(newRoomDto);
        roomRepository.save(room);
        return roomMapper.roomToSimpleRoomDto(room);
    }

    public RoomDto joinRoom(UserRoomKeyDto userRoomKey) {
        User user = userRepository.findUserByLogin(userRoomKey.getLogin());
        Room room = roomRepository.findRoomById(userRoomKey.getRoomId());
        var roomDto = roomMapper.roomToRoomDto(room);

        if (!room.getUsers().contains(user)) {
            room.addUser(user);

            Message joinMessage = createMessage(userRoomKey, MessageType.JOIN);
            MessageDto joinMessageDto = messageMapper.messageToMessageDto(joinMessage);
            sendMessageDtoToMessages(room.getId(), joinMessageDto);

            room.addMessage(joinMessage);
            roomRepository.save(room);

            roomDto = roomMapper.roomToRoomDto(room);
            sendRoomDtoToUserList(room.getId(), roomDto);
        }

        return roomDto;
    }

    public RoomDto removeUserFromRoom(UserRoomKeyDto userRoomKey) {
        User user = userRepository.findUserByLogin(userRoomKey.getLogin());
        Room room = roomRepository.findRoomById(userRoomKey.getRoomId());

        Message leaveMessage = createMessage(userRoomKey, MessageType.LEAVE);
        MessageDto leaveMessageDto = messageMapper.messageToMessageDto(leaveMessage);
        sendMessageDtoToMessages(room.getId(), leaveMessageDto);

        room.removeUser(user);
        room.addMessage(leaveMessage);
        roomRepository.save(room);

        var roomDto = roomMapper.roomToRoomDto(room);
        sendRoomDtoToUserList(room.getId(), roomDto);

        return roomDto;
    }

    private Message createMessage(UserRoomKeyDto userRoomKey, MessageType type) {
        var message = new Message();
        message.setType(type);
        message.setFirstName(userRoomKey.getFirstName());
        message.setLastName(userRoomKey.getLastName());
        return message;
    }

    public void sendMessageDtoToMessages(Long roomId, MessageDto messageDto) {
        messageDto.setDateTime(OffsetDateTime.now());
        messagingTemplate.convertAndSend(format("/chat/%s/messages", roomId), messageDto);
    }

    private void sendRoomDtoToUserList(Long roomId, RoomDto roomDto) {
        messagingTemplate.convertAndSend(format("/chat/%s/userList", roomId), roomDto);
    }
}
