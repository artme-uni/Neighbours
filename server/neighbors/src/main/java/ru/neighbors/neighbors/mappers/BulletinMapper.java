package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import ru.neighbors.neighbors.dto.BulletinDto;
import ru.neighbors.neighbors.entities.Bulletin;

@Mapper(componentModel = "spring", uses = UserMapper.class,
        imports = {Bulletin.class, BulletinDto.class})
public interface BulletinMapper {
    BulletinDto bulletinToBulletinDto(Bulletin bulletin);

    Bulletin bulletinDtoToBulletin(BulletinDto bulletinDto);

    void updateBulletinFromBulletinDto(BulletinDto bulletinDto, @MappingTarget Bulletin bulletin);
}
