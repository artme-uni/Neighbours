package ru.neighbors.neighbors.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@NoArgsConstructor
@Entity(name = "bulletins")
public class Bulletin {
    @Id
    @Column(name = "bulletin_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User owner;
    private String title;
    private String text;
    private Date publicationDate;
}
