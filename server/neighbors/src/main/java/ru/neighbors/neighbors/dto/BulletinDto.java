package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.sql.Date;

@Data
@NoArgsConstructor
public class BulletinDto {
    private long id;
    @Valid
    private BulletinUserDto owner;
    @NotBlank
    private String title;
    @NotBlank
    private String text;
    private Date publicationDate;
}
