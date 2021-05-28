package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity(name = "rooms")
public class Room {
    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rooms_seq_gen")
    @SequenceGenerator(name = "rooms_seq_gen", sequenceName = "rooms_id_seq", allocationSize = 1)
    private Long id;

    private String roomName;
    private String city;
    private String street;
    private Integer houseNumber;
    @ManyToMany
    private Set<User> users = new HashSet<>();
    @OneToMany(mappedBy = "room")
    private Set<Message> messages = new HashSet<>();

    public void addUser(User user) {
        this.users.add(user);
    }

    public void removeUser(User user) {
        this.users.remove(user);
    }
}
