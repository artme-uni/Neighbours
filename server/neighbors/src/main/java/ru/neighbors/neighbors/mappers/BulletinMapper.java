package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import ru.neighbors.neighbors.dto.BulletinDto;
import ru.neighbors.neighbors.dto.UserDto;
import ru.neighbors.neighbors.entities.Bulletin;

@Mapper(componentModel = "spring")
public interface BulletinMapper {
    BulletinDto bulletinToBulletinDto(Bulletin bulletin);
    Bulletin toEntity(BulletinDto bulletinDto);
}
