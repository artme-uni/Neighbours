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
import ru.neighbors.neighbors.dto.LoginRequestUserDto;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.repositories.UserRepository;
import ru.neighbors.neighbors.services.exceptions.UserLoginExistsException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        TransactionDbUnitTestExecutionListener.class
})
@DatabaseSetup("/dataset.xml")
class UserServiceTest {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Test
    void testRegistration() throws UserLoginExistsException {
        var registrationUserDto = new RegistrationUserDto();
        registrationUserDto.setFirstName("Тест-Имя");
        registrationUserDto.setLastName("Тест-Фамилия");
        registrationUserDto.setMiddleName("Тест-Отчество");
        registrationUserDto.setCity("Новосибирск");
        registrationUserDto.setStreet("Пирогова");
        registrationUserDto.setHouseNumber(1);
        registrationUserDto.setLogin("test@mail.ru");
        registrationUserDto.setPassword("TestTest123");
        userService.createUser(registrationUserDto);
        assertTrue(userRepository.findUserByLogin("test@mail.ru").isPresent());
    }

    @Test
    void testRegistrationWithExistingLogin() {
        var registrationUserDto = new RegistrationUserDto();
        registrationUserDto.setFirstName("Тест-Имя");
        registrationUserDto.setLastName("Тест-Фамилия");
        registrationUserDto.setMiddleName("Тест-Отчество");
        registrationUserDto.setCity("Новосибирск");
        registrationUserDto.setStreet("Пирогова");
        registrationUserDto.setHouseNumber(1);
        registrationUserDto.setLogin("ivanov@ya.ru");
        registrationUserDto.setPassword("TestTest123");
        assertThrows(UserLoginExistsException.class, () -> userService.createUser(registrationUserDto));
    }

    @Test
    void testLogin() {
        var loginRequestDto = new LoginRequestUserDto();
        loginRequestDto.setLogin("ivanov@ya.ru");
        loginRequestDto.setPassword("wruyikj324dd@33$");
        var loginResponseDto = userService.loginUser(loginRequestDto);
        assertEquals("Иванов", loginResponseDto.getFirstName());
        assertEquals("Иван", loginResponseDto.getLastName());
        assertEquals("Новосибирск", loginResponseDto.getCity());
        assertEquals("Пирогова", loginResponseDto.getStreet());
    }
}