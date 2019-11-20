-- heroku pg:psql

CREATE TABLE ACCOUNT (
    person_id       SERIAL          PRIMARY KEY
,   email           VARCHAR(256)    NOT NULL
,   hashed_pass     VARCHAR(256)    NOT NULL
);

CREATE TABLE DECK (
    deck_id         SERIAL          PRIMARY KEY
,   title           VARCHAR(256)    NOT NULL
);

INSERT INTO PERSON (
    person_id
,   f_name
) VALUES (
    1
,   'Adam'
);