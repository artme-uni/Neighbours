package ru.neighbors.neighbors.services;

import com.github.springtestdbunit.TransactionDbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;
import ru.neighbors.neighbors.dto.ChatMemberLoginDto;
import ru.neighbors.neighbors.dto.NewRoomDto;
import ru.neighbors.neighbors.dto.UserRoomKeyDto;
import ru.neighbors.neighbors.repositories.RoomRepository;
import ru.neighbors.neighbors.services.exceptions.ChatMemberException;
import ru.neighbors.neighbors.services.exceptions.IllegalChatNameException;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        TransactionDbUnitTestExecutionListener.class
})
@DatabaseSetup("/dataset.xml")
@Transactional
class RoomServiceTest {
    @Autowired
    private RoomService roomService;
    @Autowired
    private RoomRepository roomRepository;

    @Test
    void testCustomRoomCreation() throws IllegalChatNameException {
        var newRoomDto = new NewRoomDto();
        newRoomDto.setRoomName("Тест-Комната");
        newRoomDto.setCity("Новосибирск");
        newRoomDto.setStreet("Пирогова");
        newRoomDto.setHouseNumber(4);
        var simpleRoomDto = roomService.createCustomRoom(newRoomDto);
        assertEquals("Тест-Комната", simpleRoomDto.getRoomName());
        var isExistsRoom = roomRepository.findAll()
                .stream()
                .anyMatch(room -> room.getRoomName().equals("Тест-Комната"));
        assertTrue(isExistsRoom);
    }

    @Test
    void testCustomRoomCreationWithIllegalName() {
        var newRoomDto = new NewRoomDto();
        newRoomDto.setRoomName("Мой дом");
        newRoomDto.setCity("Новосибирск");
        newRoomDto.setStreet("Пирогова");
        newRoomDto.setHouseNumber(4);
        assertThrows(IllegalChatNameException.class, () -> roomService.createCustomRoom(newRoomDto));
    }

    @Test
    void testJoiningRoom() {
        var userRoomKeyDto = new UserRoomKeyDto();
        userRoomKeyDto.setRoomId(4);
        userRoomKeyDto.setLogin("ivanov@ya.ru");
        roomService.joinRoom(userRoomKeyDto);
        var isUserJoined = roomRepository.findRoomById(4L).get().getUsers()
                .stream()
                .anyMatch(user -> user.getLogin().equals("ivanov@ya.ru"));
        assertTrue(isUserJoined);
    }

    @Test
    void testRemovingUserFromRoom() {
        var userRoomKeyDto = new UserRoomKeyDto();
        userRoomKeyDto.setRoomId(4);
        userRoomKeyDto.setLogin("ivanov@ya.ru");
        roomService.joinRoom(userRoomKeyDto);
        roomService.removeUserFromRoom(userRoomKeyDto);
        var isUserInRoom = roomRepository.findRoomById(4L).get().getUsers()
                .stream()
                .anyMatch(user -> user.getLogin().equals("ivanov@ya.ru"));
        assertFalse(isUserInRoom);
    }

    @Test
    void testRegisteringNewChatMember() throws ChatMemberException {
        var chatMemberLoginDto = new ChatMemberLoginDto();
        chatMemberLoginDto.setLogin("ivanov@ya.ru");
        chatMemberLoginDto.setRoomId(4);
        roomService.registerNewChatMember(chatMemberLoginDto);
        var isUserInRoom = roomRepository.findRoomById(4L).get().getUsers()
                .stream()
                .anyMatch(user -> user.getLogin().equals("ivanov@ya.ru"));
        assertTrue(isUserInRoom);
    }

    @Test
    void testRemovingChatMember() throws ChatMemberException {
        var chatMemberLoginDto = new ChatMemberLoginDto();
        chatMemberLoginDto.setLogin("ivanov@ya.ru");
        chatMemberLoginDto.setRoomId(4);
        roomService.registerNewChatMember(chatMemberLoginDto);
        roomService.removeChatMember(chatMemberLoginDto);
        var isUserInRoom = roomRepository.findRoomById(4L).get().getUsers()
                .stream()
                .anyMatch(user -> user.getLogin().equals("ivanov@ya.ru"));
        assertFalse(isUserInRoom);
    }
}
