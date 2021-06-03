package ru.neighbors.neighbors.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressDto {
    private String city;
    private String street;
    private Integer houseNumber;
}
