package ru.neighbors.neighbors.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class BulletinDto {
    private long id;

    private UserDto owner;
    private String title;
    private String text;
    private Date publicationDate;
}
