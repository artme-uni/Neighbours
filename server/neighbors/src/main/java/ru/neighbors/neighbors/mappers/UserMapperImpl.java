package ru.neighbors.neighbors.mappers;

import org.springframework.stereotype.Component;
import ru.neighbors.neighbors.dto.LoginResponseUserDto;
import ru.neighbors.neighbors.dto.RegistrationUserDto;
import ru.neighbors.neighbors.dto.UserRoomDto;
import ru.neighbors.neighbors.entities.User;

import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-05-31T13:47:28+0700",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.8.3.jar, environment: Java 15 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User registrationUserDtoToUser(RegistrationUserDto registrationUserDto) {
        if ( registrationUserDto == null ) {
            return null;
        }

        User user = new User();

        user.setFirstName( registrationUserDto.getFirstName() );
        user.setLastName( registrationUserDto.getLastName() );
        user.setMiddleName( registrationUserDto.getMiddleName() );
        user.setCity( registrationUserDto.getCity() );
        user.setStreet( registrationUserDto.getStreet() );
        user.setHouseNumber( registrationUserDto.getHouseNumber() );
        user.setLogin( registrationUserDto.getLogin() );
        user.setPassword( registrationUserDto.getPassword() );

        return user;
    }

    @Override
    public LoginResponseUserDto userToLoginResponseUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        LoginResponseUserDto loginResponseUserDto = new LoginResponseUserDto();

        loginResponseUserDto.setFirstName( user.getFirstName() );
        loginResponseUserDto.setLastName( user.getLastName() );
        loginResponseUserDto.setMiddleName( user.getMiddleName() );
        loginResponseUserDto.setCity( user.getCity() );
        loginResponseUserDto.setStreet( user.getStreet() );
        loginResponseUserDto.setHouseNumber( user.getHouseNumber() );

        return loginResponseUserDto;
    }

    @Override
    public UserRoomDto userToUserRoomDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserRoomDto userRoomDto = new UserRoomDto();

        userRoomDto.setLogin( user.getLogin() );
        userRoomDto.setFirstName( user.getFirstName() );
        userRoomDto.setLastName( user.getLastName() );

        return userRoomDto;
    }
}
