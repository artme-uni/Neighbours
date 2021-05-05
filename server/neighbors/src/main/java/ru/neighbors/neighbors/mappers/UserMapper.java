package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import ru.neighbors.neighbors.dto.BulletinUserDto;
import ru.neighbors.neighbors.dto.LoginResponseUserDto;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User registrationUserDtoToUser(RegistrationUserDto registrationUserDto);
    LoginResponseUserDto userToLoginResponseUserDto(User user);
    BulletinUserDto userToBulletinUserDto(User user);
}
