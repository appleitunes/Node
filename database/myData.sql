-- heroku pg:psql

DROP TABLE IF EXISTS ACCOUNT, DECK, CARD;

CREATE TABLE ACCOUNT (
    account_id      SERIAL          PRIMARY KEY
,   email           VARCHAR(256)    NOT NULL
,   pass            VARCHAR(256)    NOT NULL
);

CREATE TABLE DECK (
    deck_id         SERIAL          PRIMARY KEY
,   title           VARCHAR(256)    NOT NULL
,   owner_account   SERIAL          REFERENCES ACCOUNT(account_id)
);

CREATE TABLE CARD (
    card_id         SERIAL          PRIMARY KEY
,   front           VARCHAR(22)     NOT NULL
,   back            VARCHAR(22)     NOT NULL
,   owner_deck      SERIAL          REFERENCES DECK(deck_id)
);

INSERT INTO ACCOUNT (
    account_id
,   email
,   pass
) VALUES (
    1
,   'example@email.com'
,   'password'
);

INSERT INTO DECK (
    deck_id
,   title
,   owner_account
) VALUES (
    2
,   'Example Deck'
,   1
);

INSERT INTO CARD (
    card_id
,   front
,   back
,   owner_deck
) VALUES (
    3
,   '1'
,   '2'
,   2
);

INSERT INTO CARD (
    card_id
,   front
,   back
,   owner_deck
) VALUES (
    4
,   '3'
,   '4'
,   2
);