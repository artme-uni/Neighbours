package ru.neighbors.neighbors.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.neighbors.neighbors.entities.Bulletin;

@Repository
public interface BulletinRepository extends JpaRepository<Bulletin, Long> {

}
