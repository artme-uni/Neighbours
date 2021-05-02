package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import ru.neighbors.neighbors.dto.UserDto;
import ru.neighbors.neighbors.entities.User;

@Mapper(componentModel = "spring", uses = {BulletinMapper.class})
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto userDto);
}
