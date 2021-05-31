package ru.neighbors.neighbors.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.neighbors.neighbors.dto.AddressDto;
import ru.neighbors.neighbors.dto.BulletinDto;
import ru.neighbors.neighbors.services.IBulletinService;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@CrossOrigin
@RequestMapping("/bulletins")
@Slf4j
public class BulletinController {
    private final IBulletinService bulletinService;

    public BulletinController(IBulletinService bulletinService) {
        this.bulletinService = bulletinService;
    }

    @GetMapping
    public Collection<BulletinDto> findAll(@RequestBody AddressDto addressDto) {
        return bulletinService.findAll(addressDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Object> create(@Valid @RequestBody BulletinDto bulletinDto) {
        log.info("Want to create new bulletin:{}", bulletinDto);
        bulletinService.create(bulletinDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping(value = "/{id}")
    public BulletinDto findById(@PathVariable("id") Long id) {
        return bulletinService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BulletinDto> update(@Valid @RequestBody BulletinDto bulletinDto) {
        return ResponseEntity.ok(bulletinService.update(bulletinDto));
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        bulletinService.deleteById(id);
    }

}
