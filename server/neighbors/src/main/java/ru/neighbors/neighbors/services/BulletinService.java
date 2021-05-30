package ru.neighbors.neighbors.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.neighbors.neighbors.dto.BulletinDto;
import ru.neighbors.neighbors.entities.Bulletin;
import ru.neighbors.neighbors.mappers.BulletinMapper;
import ru.neighbors.neighbors.repositories.BulletinRepository;
import ru.neighbors.neighbors.repositories.UserRepository;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class BulletinService implements IBulletinService {
    private final BulletinRepository bulletinRepository;
    private final UserRepository userRepository;
    private final BulletinMapper bulletinMapper;

    public BulletinService(BulletinRepository bulletinRepository,
                           UserRepository userRepository,
                           BulletinMapper bulletinMapper) {
        this.bulletinRepository = bulletinRepository;
        this.userRepository = userRepository;
        this.bulletinMapper = bulletinMapper;
    }

    @Override
    public List<BulletinDto> findAll() {
        return bulletinRepository.findAll()
                .stream()
                .map(bulletinMapper::bulletinToBulletinDto)
                .collect(Collectors.toList());
    }

    @Override
    public BulletinDto findById(Long id) {
        Bulletin bulletin = bulletinRepository.getOne(id);
        log.info(bulletin.toString());
        return bulletinMapper.bulletinToBulletinDto(bulletin);
    }

    @Override
    public void create(BulletinDto dto) {
        Bulletin bulletin = bulletinMapper.bulletinDtoToBulletin(dto);
        bulletin.setPublicationDate(new Date(System.currentTimeMillis()));
        bulletin.setOwner(userRepository.findUserByLogin(bulletin.getOwner().getLogin()).orElseThrow());
        bulletinRepository.save(bulletin);
        log.info("Created: " + bulletin);
    }

    @Override
    public BulletinDto update(BulletinDto dto) {
        var bulletin = bulletinRepository.getOne(dto.getId());
        bulletinMapper.updateBulletinFromBulletinDto(dto, bulletin);
        bulletin.setPublicationDate(new Date(System.currentTimeMillis()));
        log.info("Update:" + bulletin);
        return bulletinMapper.bulletinToBulletinDto(bulletinRepository.save(bulletin));
    }

    @Override
    public void deleteById(Long id) {
        log.info("Want to delete bulletin with id={}", id);
        bulletinRepository.deleteById(id);
    }
}
