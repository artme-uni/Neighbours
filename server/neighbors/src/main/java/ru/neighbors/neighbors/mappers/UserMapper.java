package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import ru.neighbors.neighbors.dto.LoginUserDto;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.dto.UserDto;
import ru.neighbors.neighbors.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto userDto);
    UserDto registrationUserDtoToUserDto(RegistrationUserDto registrationUserDto);
    User registrationUserDtoToUser(RegistrationUserDto registrationUserDto);
    User loginUserDtoToUser(LoginUserDto loginUserDto);
}
