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
    public ResponseEntity<BulletinDto> create(@RequestBody BulletinDto bulletinDto) {
        return ResponseEntity.ok(bulletinService.create(bulletinDto));
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BulletinDto> update(@PathVariable("id") Long id,
                                              @RequestBody BulletinDto bulletinDto) {
        return ResponseEntity.ok(bulletinService.update(bulletinDto));
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        bulletinService.deleteById(id);
    }

}
