package ru.neighbors.neighbors.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.neighbors.neighbors.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
