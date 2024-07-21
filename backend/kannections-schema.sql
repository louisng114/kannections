CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password VARCHAR NOT NULL,
  total_wins INT NOT NULL,
  perfect_wins INT NOT NULL
);

CREATE TABLE achievements (
  code VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL
);

CREATE TABLE users_achievements (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  code VARCHAR
    REFERENCES achievements ON DELETE CASCADE,
  PRIMARY KEY (username, code)
);