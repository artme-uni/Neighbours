package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private String username;
    private String text;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
