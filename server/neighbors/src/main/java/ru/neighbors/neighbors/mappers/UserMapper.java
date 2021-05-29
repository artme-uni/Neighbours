package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.entities.User;

@Mapper(componentModel = "spring",
        imports = {User.class, RegistrationUserDto.class, LoginResponseUserDto.class,
                BulletinUserDto.class, UserRoomDto.class, UserLoginDto.class})
public interface UserMapper {
    User registrationUserDtoToUser(RegistrationUserDto registrationUserDto);

    LoginResponseUserDto userToLoginResponseUserDto(User user);

    BulletinUserDto userToBulletinUserDto(User user);

    UserRoomDto userToUserRoomDto(User user);

    UserLoginDto userToUserLoginDto(User user);
}
