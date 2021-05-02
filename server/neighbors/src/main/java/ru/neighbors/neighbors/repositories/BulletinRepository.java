package ru.neighbors.neighbors.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.neighbors.neighbors.entities.Bulletin;

public interface BulletinRepository extends JpaRepository<Bulletin, Long> {
}
