package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User registrationUserDtoToUser(RegistrationUserDto registrationUserDto);

    LoginResponseUserDto userToLoginResponseUserDto(User user);

    UserRoomDto userToUserRoomDto(User user);
}
