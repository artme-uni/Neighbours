package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@Entity(name = "users")
public class User {
    @Id
    @Column(name = "user_id")
    private long id;

    private String firstName;
    private String lastName;
    private String middleName;
    private String login;
    private String password;
}
