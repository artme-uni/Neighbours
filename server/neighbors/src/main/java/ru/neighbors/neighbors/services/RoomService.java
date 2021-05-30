package ru.neighbors.neighbors.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.entities.Message;
import ru.neighbors.neighbors.entities.MessageType;
import ru.neighbors.neighbors.entities.Room;
import ru.neighbors.neighbors.entities.User;
import ru.neighbors.neighbors.mappers.MessageMapper;
import ru.neighbors.neighbors.mappers.RoomMapper;
import ru.neighbors.neighbors.mappers.UserMapper;
import ru.neighbors.neighbors.repositories.RoomRepository;
import ru.neighbors.neighbors.repositories.UserRepository;
import ru.neighbors.neighbors.services.exceptions.ChatMemberException;
import ru.neighbors.neighbors.services.exceptions.IllegalChatNameException;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
@Slf4j
public class RoomService {
    private static final String HOME_ROOM_NAME = "Мой дом";
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

    public SimpleRoomDto createCustomRoom(NewRoomDto newRoomDto) throws IllegalChatNameException {
        if (newRoomDto.getRoomName().equals(HOME_ROOM_NAME)) {
            throw new IllegalChatNameException("Chat name shouldn't be the same as home chat name");
        }
        return createRoom(newRoomDto);
    }

    public void addUserToHomeRoom(User user) {
        var homeRoomDto = new NewRoomDto();
        homeRoomDto.setCity(user.getCity());
        homeRoomDto.setStreet(user.getStreet());
        homeRoomDto.setHouseNumber(user.getHouseNumber());
        homeRoomDto.setRoomName(HOME_ROOM_NAME);
        if (!existsRoom(homeRoomDto)) {
            createHomeRoom(homeRoomDto);
            log.info("Home room has been successfully created: {}", homeRoomDto);
        }
        Optional<Room> homeRoom = roomRepository
                .findFirstByRoomNameAndCityAndStreetAndHouseNumber(
                        homeRoomDto.getRoomName(),
                        homeRoomDto.getCity(),
                        homeRoomDto.getStreet(),
                        homeRoomDto.getHouseNumber());
        if (homeRoom.isPresent()) {
            homeRoom.get().addUser(user);
            roomRepository.save(homeRoom.get());
            log.info("User {} has been added to home room", user);
        }
    }

    public RoomDto joinRoom(@NonNull UserRoomKeyDto userRoomKey) {
        User user = userRepository.findUserByLogin(userRoomKey.getLogin()).orElseThrow();
        Room room = roomRepository.findRoomById(userRoomKey.getRoomId()).orElseThrow();
        RoomDto roomDto = roomMapper.roomToRoomDto(room);

        if (!room.getUsers().contains(user)) {
            room.addUser(user);

            Message joinMessage = createMessage(userRoomKey, MessageType.JOIN);
            joinMessage.setRoom(room);
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
        message.setDateTime(OffsetDateTime.now());
        message.setMessageType(type);
        message.setFirstName(userRoomKey.getFirstName());
        message.setLastName(userRoomKey.getLastName());
        return message;
    }

    public void sendMessageDtoToMessages(Long roomId, MessageDto messageDto) {
        messageDto.setDateTime(OffsetDateTime.now());
        Room room = roomRepository.findRoomById(roomId).orElseThrow();
        var message = messageMapper.messageDtoToMessage(messageDto);
        message.setRoom(room);
        room.addMessage(message);
        roomRepository.save(room);
        log.info("New message has just added:{}", messageDto);
        messagingTemplate.convertAndSend(format("/chat/%s/messages", roomId), messageDto);
    }

    private void sendRoomDtoToUserList(Long roomId, RoomDto roomDto) {
        messagingTemplate.convertAndSend(format("/chat/%s/userList", roomId), roomDto);
    }

    public ChatMembersDto registerNewChatMember(ChatMemberLoginDto chatMemberDto) throws ChatMemberException {
        Room room = roomRepository.findRoomById(chatMemberDto.getRoomId()).orElseThrow();
        User user = userRepository.findUserByLogin(chatMemberDto.getLogin()).orElseThrow();

        if (room.getUsers().contains(user)) {
            throw new ChatMemberException("User(" + user + ") has already exist in this room:" + room);
        }

        room.addUser(user);
        roomRepository.save(room);
        List<UserRoomDto> userRoomDtos = room.getUsers()
                .stream()
                .map(userMapper::userToUserRoomDto)
                .collect(Collectors.toList());
        return new ChatMembersDto(userRoomDtos);
    }

    public ChatMembersDto removeChatMember(ChatMemberLoginDto chatMemberDto) throws ChatMemberException {
        Room room = roomRepository.findRoomById(chatMemberDto.getRoomId()).orElseThrow();
        User user = userRepository.findUserByLogin(chatMemberDto.getLogin()).orElseThrow();

        if (!room.getUsers().contains(user)) {
            throw new ChatMemberException("User(" + user + ") doesn't exist in this room:" + room);
        }

        room.removeUser(user);
        roomRepository.save(room);
        List<UserRoomDto> userRoomDtos = room.getUsers()
                .stream()
                .map(userMapper::userToUserRoomDto)
                .collect(Collectors.toList());
        return new ChatMembersDto(userRoomDtos);
    }

    private SimpleRoomDto createRoom(@NonNull NewRoomDto newRoomDto){
        Room room = roomMapper.newRoomDtoToRoom(newRoomDto);
        Objects.requireNonNull(room);
        roomRepository.save(room);

        log.info("New room has been created: {}", room);
        return roomMapper.roomToSimpleRoomDto(room);
    }

    private boolean existsRoom(NewRoomDto newRoomDto) {
        Optional<Room> homeRoom = roomRepository
                .findFirstByRoomNameAndCityAndStreetAndHouseNumber(
                        newRoomDto.getRoomName(),
                        newRoomDto.getCity(),
                        newRoomDto.getStreet(),
                        newRoomDto.getHouseNumber());
        return homeRoom.isPresent();
    }

    private void createHomeRoom(NewRoomDto newRoomDto) {
        createRoom(newRoomDto);
    }
}
