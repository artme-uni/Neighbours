package ru.neighbors.neighbors.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.entities.Message;
import ru.neighbors.neighbors.entities.Room;
import ru.neighbors.neighbors.entities.User;
import ru.neighbors.neighbors.mappers.MessageMapper;
import ru.neighbors.neighbors.mappers.RoomMapper;
import ru.neighbors.neighbors.mappers.UserMapper;
import ru.neighbors.neighbors.repositories.RoomRepository;
import ru.neighbors.neighbors.repositories.UserRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
@Slf4j
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final MessageMapper messageMapper;
    private final SimpMessageSendingOperations messagingTemplate;

    public RoomService(RoomRepository roomRepository,
                       RoomMapper roomMapper,
                       UserMapper userMapper, UserRepository userRepository,
                       MessageMapper messageMapper,
                       SimpMessageSendingOperations messagingTemplate) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.messageMapper = messageMapper;
        this.messagingTemplate = messagingTemplate;
    }

    public List<UserRoomDto> getUsersByAddress(AddressDto addressDto) {
        String city = addressDto.getCity();
        String street = addressDto.getStreet();
        Integer houseNumber = addressDto.getHouseNumber();
        return userRepository.findUsersByCityContainingAndStreetContainingAndHouseNumber(city, street, houseNumber)
                .stream()
                .map(userMapper::userToUserRoomDto)
                .collect(Collectors.toList());
    }

    public List<SimpleRoomDto> getRoomList(@NonNull String login) {
        User user = userRepository.findUserByLogin(login).orElseThrow();
        return roomRepository.findByUsersContaining(user)
                .stream()
                .map(roomMapper::roomToSimpleRoomDto)
                .collect(Collectors.toList());
    }

    public SimpleRoomDto createRoom(@NonNull NewRoomDto newRoomDto) {
        Room room = roomMapper.newRoomDtoToRoom(newRoomDto);
        Objects.requireNonNull(room);
        roomRepository.save(room);

        log.info("New room jas just created:{}", room);
        return roomMapper.roomToSimpleRoomDto(room);
    }

    public RoomDto joinRoom(@NonNull UserRoomKeyDto userRoomKey) {
        User user = userRepository.findUserByLogin(userRoomKey.getLogin()).orElseThrow();
        Room room = roomRepository.findRoomById(userRoomKey.getRoomId()).orElseThrow();
        RoomDto roomDto = roomMapper.roomToRoomDto(room);

        if (!room.getUsers().contains(user)) {
            room.addUser(user);

            Message joinMessage = createMessage(userRoomKey);
            MessageDto joinMessageDto = messageMapper.messageToMessageDto(joinMessage);
            sendMessageDtoToMessages(room.getId(), joinMessageDto);

            room.addMessage(joinMessage);
            roomRepository.save(room);

            roomDto = roomMapper.roomToRoomDto(room);
            sendRoomDtoToUserList(room.getId(), roomDto);
        }

        return roomDto;
    }

    public RoomDto removeUserFromRoom(@NonNull UserRoomKeyDto userRoomKey) {
        User user = userRepository.findUserByLogin(userRoomKey.getLogin()).orElseThrow();
        Room room = roomRepository.findRoomById(userRoomKey.getRoomId()).orElseThrow();

        Message leaveMessage = createMessage(userRoomKey);
        MessageDto leaveMessageDto = messageMapper.messageToMessageDto(leaveMessage);
        sendMessageDtoToMessages(room.getId(), leaveMessageDto);

        room.removeUser(user);
        room.addMessage(leaveMessage);
        roomRepository.save(room);

        var roomDto = roomMapper.roomToRoomDto(room);
        sendRoomDtoToUserList(room.getId(), roomDto);

        return roomDto;
    }

    private Message createMessage(UserRoomKeyDto userRoomKey) {
        var message = new Message();
        message.setFirstName(userRoomKey.getFirstName());
        message.setLastName(userRoomKey.getLastName());
        return message;
    }

    public void sendMessageDtoToMessages(Long roomId, MessageDto messageDto) {
        messageDto.setDateTime(OffsetDateTime.now());
        roomRepository.findRoomById(roomId)
                .orElseThrow()
                .addMessage(messageMapper.messageDtoToMessage(messageDto));
        messagingTemplate.convertAndSend(format("/chat/%s/messages", roomId), messageDto);
    }

    private void sendRoomDtoToUserList(Long roomId, RoomDto roomDto) {
        messagingTemplate.convertAndSend(format("/chat/%s/userList", roomId), roomDto);
    }
}
