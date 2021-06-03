package ru.neighbors.neighbors.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import ru.neighbors.neighbors.entities.MessageType;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    @Enumerated(EnumType.STRING)
    @NonNull
    private MessageType messageType;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String text;
    private OffsetDateTime dateTime;
}
