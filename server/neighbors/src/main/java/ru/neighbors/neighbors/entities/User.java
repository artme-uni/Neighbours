package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
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

    @ManyToMany
    private Set<Room> rooms = new HashSet<>();
}
