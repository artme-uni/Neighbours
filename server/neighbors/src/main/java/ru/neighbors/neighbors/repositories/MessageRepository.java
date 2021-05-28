package ru.neighbors.neighbors.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.neighbors.neighbors.entities.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
