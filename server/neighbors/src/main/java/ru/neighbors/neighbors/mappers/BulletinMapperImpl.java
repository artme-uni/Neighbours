package ru.neighbors.neighbors.mappers;

import org.springframework.stereotype.Component;
import ru.neighbors.neighbors.dto.BulletinDto;
import ru.neighbors.neighbors.dto.BulletinUserDto;
import ru.neighbors.neighbors.entities.Bulletin;
import ru.neighbors.neighbors.entities.User;

import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-05-31T13:47:28+0700",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.8.3.jar, environment: Java 15 (Oracle Corporation)"
)
@Component
public class BulletinMapperImpl implements BulletinMapper {

    @Override
    public BulletinDto bulletinToBulletinDto(Bulletin bulletin) {
        if ( bulletin == null ) {
            return null;
        }

        BulletinDto bulletinDto = new BulletinDto();

        bulletinDto.setId( bulletin.getId() );
        bulletinDto.setOwner( userToBulletinUserDto( bulletin.getOwner() ) );
        bulletinDto.setTitle( bulletin.getTitle() );
        bulletinDto.setText( bulletin.getText() );
        bulletinDto.setPublicationDate( bulletin.getPublicationDate() );

        return bulletinDto;
    }

    @Override
    public Bulletin bulletinDtoToBulletin(BulletinDto bulletinDto) {
        if ( bulletinDto == null ) {
            return null;
        }

        Bulletin bulletin = new Bulletin();

        bulletin.setId( bulletinDto.getId() );
        bulletin.setOwner( bulletinUserDtoToUser( bulletinDto.getOwner() ) );
        bulletin.setTitle( bulletinDto.getTitle() );
        bulletin.setText( bulletinDto.getText() );
        bulletin.setPublicationDate( bulletinDto.getPublicationDate() );

        return bulletin;
    }

    @Override
    public void updateBulletinFromBulletinDto(BulletinDto bulletinDto, Bulletin bulletin) {
        if ( bulletinDto == null ) {
            return;
        }

        bulletin.setId( bulletinDto.getId() );
        if ( bulletinDto.getOwner() != null ) {
            if ( bulletin.getOwner() == null ) {
                bulletin.setOwner( new User() );
            }
            bulletinUserDtoToUser1( bulletinDto.getOwner(), bulletin.getOwner() );
        }
        else {
            bulletin.setOwner( null );
        }
        bulletin.setTitle( bulletinDto.getTitle() );
        bulletin.setText( bulletinDto.getText() );
        bulletin.setPublicationDate( bulletinDto.getPublicationDate() );
    }

    protected BulletinUserDto userToBulletinUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        BulletinUserDto bulletinUserDto = new BulletinUserDto();

        bulletinUserDto.setFirstName( user.getFirstName() );
        bulletinUserDto.setLastName( user.getLastName() );
        bulletinUserDto.setLogin( user.getLogin() );

        return bulletinUserDto;
    }

    protected User bulletinUserDtoToUser(BulletinUserDto bulletinUserDto) {
        if ( bulletinUserDto == null ) {
            return null;
        }

        User user = new User();

        user.setFirstName( bulletinUserDto.getFirstName() );
        user.setLastName( bulletinUserDto.getLastName() );
        user.setLogin( bulletinUserDto.getLogin() );

        return user;
    }

    protected void bulletinUserDtoToUser1(BulletinUserDto bulletinUserDto, User mappingTarget) {
        if ( bulletinUserDto == null ) {
            return;
        }

        mappingTarget.setFirstName( bulletinUserDto.getFirstName() );
        mappingTarget.setLastName( bulletinUserDto.getLastName() );
        mappingTarget.setLogin( bulletinUserDto.getLogin() );
    }
}
