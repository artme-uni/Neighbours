package ru.neighbors.neighbors.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.neighbors.neighbors.entities.Room;
import ru.neighbors.neighbors.entities.User;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findRoomById(Long id);
    List<Room> findByUsersContaining(User user);
}
