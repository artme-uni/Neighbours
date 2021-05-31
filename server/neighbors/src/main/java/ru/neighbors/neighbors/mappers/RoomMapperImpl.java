package ru.neighbors.neighbors.mappers;

import org.springframework.stereotype.Component;
import ru.neighbors.neighbors.dto.*;
import ru.neighbors.neighbors.entities.Message;
import ru.neighbors.neighbors.entities.Room;
import ru.neighbors.neighbors.entities.User;

import javax.annotation.processing.Generated;
import java.util.HashSet;
import java.util.Set;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-05-31T13:47:28+0700",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.8.3.jar, environment: Java 15 (Oracle Corporation)"
)
@Component
public class RoomMapperImpl implements RoomMapper {

    @Override
    public SimpleRoomDto roomToSimpleRoomDto(Room room) {
        if ( room == null ) {
            return null;
        }

        SimpleRoomDto simpleRoomDto = new SimpleRoomDto();

        simpleRoomDto.setId( room.getId() );
        simpleRoomDto.setRoomName( room.getRoomName() );

        return simpleRoomDto;
    }

    @Override
    public Room newRoomDtoToRoom(NewRoomDto newRoomDto) {
        if ( newRoomDto == null ) {
            return null;
        }

        Room room = new Room();

        room.setRoomName( newRoomDto.getRoomName() );
        room.setCity( newRoomDto.getCity() );
        room.setStreet( newRoomDto.getStreet() );
        room.setHouseNumber( newRoomDto.getHouseNumber() );

        return room;
    }

    @Override
    public RoomDto roomToRoomDto(Room room) {
        if ( room == null ) {
            return null;
        }

        RoomDto roomDto = new RoomDto();

        roomDto.setId( room.getId() );
        roomDto.setRoomName( room.getRoomName() );
        roomDto.setUsers( userSetToUserRoomDtoSet( room.getUsers() ) );
        roomDto.setMessages( messageSetToMessageDtoSet( room.getMessages() ) );

        return roomDto;
    }

    protected UserRoomDto userToUserRoomDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserRoomDto userRoomDto = new UserRoomDto();

        userRoomDto.setLogin( user.getLogin() );
        userRoomDto.setFirstName( user.getFirstName() );
        userRoomDto.setLastName( user.getLastName() );

        return userRoomDto;
    }

    protected Set<UserRoomDto> userSetToUserRoomDtoSet(Set<User> set) {
        if ( set == null ) {
            return null;
        }

        Set<UserRoomDto> set1 = new HashSet<UserRoomDto>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( User user : set ) {
            set1.add( userToUserRoomDto( user ) );
        }

        return set1;
    }

    protected MessageDto messageToMessageDto(Message message) {
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

    protected Set<MessageDto> messageSetToMessageDtoSet(Set<Message> set) {
        if ( set == null ) {
            return null;
        }

        Set<MessageDto> set1 = new HashSet<MessageDto>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Message message : set ) {
            set1.add( messageToMessageDto( message ) );
        }

        return set1;
    }
}
