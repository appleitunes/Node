-- heroku pg:psql

DROP TABLE IF EXISTS ACCOUNT, DECK, CARD;

CREATE TABLE ACCOUNT (
    account_id      SERIAL          PRIMARY KEY
,   email           VARCHAR(256)    NOT NULL
,   pass            VARCHAR(256)    NOT NULL
);

CREATE TABLE DECK (
    deck_id         VARCHAR(42)     PRIMARY KEY
,   title           VARCHAR(256)    NOT NULL
,   owner_account   SERIAL          REFERENCES ACCOUNT(account_id)
);

CREATE TABLE CARD (
    card_id         VARCHAR(42)     PRIMARY KEY
,   front           VARCHAR(22)     NOT NULL
,   back            VARCHAR(22)     NOT NULL
,   owner_deck      VARCHAR(42)     REFERENCES DECK(deck_id)
);

INSERT INTO ACCOUNT (
    email
,   pass
) VALUES (
    'example@email.com'
,   'password'
);

INSERT INTO DECK (
    title
,   owner_account
) VALUES (
    'Simple English'
,   1
);

INSERT INTO CARD (
    front
,   back
,   owner_deck
) VALUES (
    'yes'
,   'yes'
,    5
);