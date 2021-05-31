package ru.neighbors.neighbors.mappers;

import org.mapstruct.Mapper;
import ru.neighbors.neighbors.dto.MessageDto;
import ru.neighbors.neighbors.entities.Message;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    MessageDto messageToMessageDto(Message message);

    Message messageDtoToMessage(MessageDto messageDto);

}
