package ru.neighbors.neighbors.services;

import ru.neighbors.neighbors.dto.AddressDto;

import java.util.List;

public interface ICrudService<T> {

    void create(T dto);

    T update(T dto);

    T findById(Long id);

    void deleteById(Long id);

    List<T> findAll(AddressDto addressDto);

}
