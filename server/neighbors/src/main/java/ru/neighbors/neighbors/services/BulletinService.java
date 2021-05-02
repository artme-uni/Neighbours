package ru.neighbors.neighbors.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.neighbors.neighbors.dto.BulletinDto;
import ru.neighbors.neighbors.entities.Bulletin;
import ru.neighbors.neighbors.mappers.BulletinMapper;
import ru.neighbors.neighbors.repositories.BulletinRepository;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class BulletinService {
    private final BulletinRepository bulletinRepository;
    private final BulletinMapper bulletinMapper;

    public BulletinService(BulletinRepository bulletinRepository, BulletinMapper bulletinMapper) {
        this.bulletinRepository = bulletinRepository;
        this.bulletinMapper = bulletinMapper;
    }

    @Override
    public List<BulletinDto> findAll() {
        return bulletinRepository.findAll()
                .stream()
                .map(bulletinMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public BulletinDto create(BulletinDto dto) {
        Bulletin bulletin = bulletinMapper.toEntity(dto);
        log.info(bulletin.toString());
        return bulletinMapper.toDto(bulletinRepository.save(bulletin));
    }
}
