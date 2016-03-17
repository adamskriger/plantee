DROP TABLE IF EXISTS users; 

-- Creates standard users table for UserAuth
CREATE TABLE users (
  user_id SERIAL UNIQUE PRIMARY KEY,
  email VARCHAR(255),
  password_digest TEXT
);
