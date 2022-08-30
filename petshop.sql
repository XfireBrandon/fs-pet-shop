DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial,
    age integer,
    kind varchar,
    name varchar
);

INSERT INTO pets (age, kind, name) VALUES (7, 'rainbow', 'fido');
INSERT INTO pets (age, kind, name) VALUES (5, 'snake', 'Buttons');