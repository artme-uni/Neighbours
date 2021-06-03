package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
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
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<User> users = new HashSet<>();
    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Message> messages;

    public void addUser(User user) {
        this.users.add(user);
    }

    public void removeUser(User user) {
        this.users.remove(user);
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Room)) return false;
        Room room = (Room) o;
        return id.equals(room.id)
                && roomName.equals(room.roomName)
                && city.equals(room.city)
                && street.equals(room.street)
                && houseNumber.equals(room.houseNumber)
                && users.equals(room.users)
                && messages.equals(room.messages);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, roomName, city, street, houseNumber);
    }
}
