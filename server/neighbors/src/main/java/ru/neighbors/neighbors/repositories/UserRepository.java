package ru.neighbors.neighbors.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.neighbors.neighbors.entities.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
