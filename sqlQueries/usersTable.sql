CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(16) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password text NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);