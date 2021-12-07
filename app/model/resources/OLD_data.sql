DROP TABLE IF EXISTS cards;
DROP  TABLE IF EXISTS  statuses;
DROP TABLE IF EXISTS boards;
DROP TABLE IF EXISTS users;

CREATE TABLE cards (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(100),
    board_id INTEGER,
    status_id INTEGER);

CREATE TABLE boards (
    id SERIAL PRIMARY KEY NOT NULL ,
    title varchar(100) NOT NULL ,
    public BOOLEAN NOT NULL ,
    user_id INTEGER);

CREATE TABLE statuses (
    id SERIAL PRIMARY KEY NOT NULL ,
    title VARCHAR(200) NOT NULL ,
    board_id INTEGER);

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL ,
    user_name VARCHAR(50),
    password VARCHAR(250),
    table_id INTEGER);


ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ;
ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE ;
ALTER TABLE ONLY  cards
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id ) REFERENCES boards(id) ON DELETE CASCADE ;
ALTER TABLE ONLY cards
    Add CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES statuses(id) ON DELETE CASCADE ;


INSERT INTO boards (title,public) VALUES ('board1',true);
INSERT INTO boards (title,public) VALUES ('board2', true);

INSERT INTO statuses (title, board_id) VALUES ('new',1);
INSERT INTO statuses (title, board_id) VALUES ('in progress',1);
INSERT INTO statuses (title, board_id) VALUES ('testing',1);
INSERT INTO statuses (title, board_id) VALUES ('done',1);
INSERT INTO statuses (title, board_id) VALUES ('new',2);
INSERT INTO statuses (title, board_id) VALUES ('in progress',2);
INSERT INTO statuses (title, board_id) VALUES ('testing',2);
INSERT INTO statuses (title, board_id) VALUES ('done',2);


INSERT INTO cards (title, board_id, status_id) VALUES ('new',1,1);
INSERT INTO cards (title, board_id, status_id) VALUES ('in progress',1,2);
INSERT INTO cards (title, board_id, status_id) VALUES ('testing',1,3);
INSERT INTO cards (title, board_id, status_id) VALUES ('done',1,4);
INSERT INTO cards (title, board_id, status_id) VALUES ('new',2,5);
INSERT INTO cards (title, board_id, status_id) VALUES ('in progress',2,6);
INSERT INTO cards (title, board_id, status_id) VALUES ('testing',2,7);
INSERT INTO cards (title, board_id, status_id) VALUES ('done',2,8);
