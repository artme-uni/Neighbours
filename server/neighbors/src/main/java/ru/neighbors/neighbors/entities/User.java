package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity(name = "users")
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq_gen")
    @SequenceGenerator(name = "users_seq_gen", sequenceName = "users_id_seq", allocationSize = 1)
    private long id;

    private String firstName;
    private String lastName;
    private String middleName;
    private String city;
    private String street;
    private Integer houseNumber;
    private String login;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Room> rooms;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return id == user.id
                && Objects.equals(firstName, user.firstName)
                && Objects.equals(lastName, user.lastName)
                && Objects.equals(middleName, user.middleName)
                && Objects.equals(city, user.city)
                && Objects.equals(street, user.street)
                && Objects.equals(houseNumber, user.houseNumber)
                && Objects.equals(login, user.login)
                && Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
