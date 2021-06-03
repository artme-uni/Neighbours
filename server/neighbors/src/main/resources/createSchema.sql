create table if not exists users(
    user_id integer not null primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    middle_name varchar(100) null,
    city varchar(100) not null,
    street varchar(100) not null,
    house_number integer not null,
    login varchar(100) not null,
    password varchar(100) not null
);

create table if not exists bulletins(
    bulletin_id integer not null primary key,
    title varchar(300) not null,
    text varchar(2000) not null,
    publication_date date not null,
    user_id integer not null references users(user_id) on delete cascade
);

create table if not exists rooms(
    room_id integer not null primary key,
    room_name varchar(300) not null,
    city varchar(100) not null,
    street varchar(100) not null,
    house_number varchar(100) not null
);

create table if not exists messages(
    message_id integer not null primary key,
    message_type varchar(100) not null,
    username varchar(100) not null,
    text varchar(2000) not null,
    room_id integer not null references rooms(room_id) on delete cascade
);

create sequence if not exists users_id_seq increment 1 start 1;
create sequence if not exists bulletins_id_seq increment 1 start 1;
create sequence if not exists rooms_id_seq increment 1 start 1;
create sequence if not exists messages_id_seq increment 1 start 1;