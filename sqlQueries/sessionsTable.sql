 CREATE TABLE sessions (
    token TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "createdAt" BIGINT NOT NULL
);