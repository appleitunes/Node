-- heroku pg:psql

CREATE TABLE PERSON (
    person_id       SERIAL          PRIMARY KEY
,   f_name          VARCHAR(22)     NOT NULL
);

INSERT INTO PERSON (
    person_id
,   f_name
) VALUES (
    1
,   'Adam'
);