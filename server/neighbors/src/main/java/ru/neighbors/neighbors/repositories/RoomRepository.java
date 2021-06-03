package ru.neighbors.neighbors.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.neighbors.neighbors.entities.Room;
import ru.neighbors.neighbors.entities.User;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findRoomById(Long id);

    List<Room> findByUsersContaining(User user);

    Optional<Room> findFirstByRoomNameAndCityAndStreetAndHouseNumber(String roomName,
                                                               String city,
                                                               String street,
                                                               Integer houseNumber);

    Optional<Room> findFirstByRoomNameAndCityAndStreet(String roomName, String city, String street);
}
