package ru.neighbors.neighbors.mappers;

import org.springframework.stereotype.Component;
import ru.neighbors.neighbors.dto.MessageDto;
import ru.neighbors.neighbors.entities.Message;

import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-05-31T13:47:28+0700",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.8.3.jar, environment: Java 15 (Oracle Corporation)"
)
@Component
public class MessageMapperImpl implements MessageMapper {

    @Override
    public MessageDto messageToMessageDto(Message message) {
        if ( message == null ) {
            return null;
        }

        MessageDto messageDto = new MessageDto();

        messageDto.setMessageType( message.getMessageType() );
        messageDto.setFirstName( message.getFirstName() );
        messageDto.setLastName( message.getLastName() );
        messageDto.setText( message.getText() );
        messageDto.setDateTime( message.getDateTime() );

        return messageDto;
    }

    @Override
    public Message messageDtoToMessage(MessageDto messageDto) {
        if ( messageDto == null ) {
            return null;
        }

        Message message = new Message();

        message.setMessageType( messageDto.getMessageType() );
        message.setFirstName( messageDto.getFirstName() );
        message.setLastName( messageDto.getLastName() );
        message.setText( messageDto.getText() );
        message.setDateTime( messageDto.getDateTime() );

        return message;
    }
}
