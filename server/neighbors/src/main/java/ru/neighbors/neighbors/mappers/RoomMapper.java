package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import ru.neighbors.neighbors.dto.NewRoomDto;
import ru.neighbors.neighbors.dto.RoomDto;
import ru.neighbors.neighbors.dto.SimpleRoomDto;
import ru.neighbors.neighbors.entities.Room;

@Mapper(componentModel = "spring", uses = {MessageMapper.class, UserMapper.class})
public interface RoomMapper {
    SimpleRoomDto roomToSimpleRoomDto(Room room);

    Room newRoomDtoToRoom(NewRoomDto newRoomDto);

    RoomDto roomToRoomDto(Room room);
}
