package ru.neighbors.neighbors.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.neighbors.neighbors.dto.BulletinDto;
import ru.neighbors.neighbors.services.IBulletinService;

import java.util.Collection;

@RestController
@RequestMapping("/bulletins")
public class BulletinController {
    private final IBulletinService bulletinService;

    public BulletinController(IBulletinService bulletinService) {
        this.bulletinService = bulletinService;
    }

    @GetMapping
    public Collection<BulletinDto> findAll() {
        return bulletinService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Object> create(@RequestBody BulletinDto bulletinDto) {
        bulletinService.create(bulletinDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping(value = "/{id}")
    public BulletinDto findById(@PathVariable("id") Long id) {
        return bulletinService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BulletinDto> update(@RequestBody BulletinDto bulletinDto) {
        return ResponseEntity.ok(bulletinService.update(bulletinDto));
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        bulletinService.deleteById(id);
    }

}
