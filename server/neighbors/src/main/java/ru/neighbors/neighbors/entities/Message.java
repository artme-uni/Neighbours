package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.OffsetDateTime;

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
    private MessageType type;
    private String firstName;
    private String lastName;
    private String text;
    private OffsetDateTime dateTime;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
