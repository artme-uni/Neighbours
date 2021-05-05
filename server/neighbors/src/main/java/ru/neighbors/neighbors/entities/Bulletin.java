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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bulletins_seq_gen")
    @SequenceGenerator(name = "bulletins_seq_gen", sequenceName = "bulletins_id_seq", allocationSize = 1)
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User owner;
    private String title;
    private String text;
    private Date publicationDate;
}
