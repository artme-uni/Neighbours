package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.Objects;

@Data
@NoArgsConstructor
@Entity(name = "messages")
public class Message {
    @Id
    @Column(name = "message_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "messages_seq_gen")
    @SequenceGenerator(name = "messages_seq_gen", sequenceName = "messages_id_seq", allocationSize = 1)
    private Long id;
    @Enumerated(EnumType.STRING)
    private MessageType messageType;
    private String firstName;
    private String lastName;
    private String text;
    private OffsetDateTime dateTime;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private Room room;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Message)) return false;
        Message message = (Message) o;
        return id.equals(message.id)
                && messageType == message.messageType
                && Objects.equals(firstName, message.firstName)
                && Objects.equals(lastName, message.lastName)
                && Objects.equals(text, message.text)
                && Objects.equals(dateTime, message.dateTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
