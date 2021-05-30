package ru.neighbors.neighbors.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.neighbors.neighbors.entities.MessageType;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    @Enumerated(EnumType.STRING)
    private MessageType type;
    private String firstName;
    private String lastName;
    private String text;
    private OffsetDateTime dateTime;
}
