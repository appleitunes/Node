-- heroku pg:psql

DROP TABLE IF EXISTS ACCOUNT;

CREATE TABLE ACCOUNT (
    person_id       SERIAL          PRIMARY KEY
,   email           VARCHAR(256)    NOT NULL
,   hashed_pass     VARCHAR(256)    NOT NULL
);

INSERT INTO ACCOUNT (
    email
,   hashed_pass
) VALUES (
    'shanedavenport15@gmail.com'
,   '7tbew986aygfnoausygf'
);