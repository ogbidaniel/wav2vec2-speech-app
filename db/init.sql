CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    username VARCHAR(80) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    auth_provider VARCHAR(20) NOT NULL
);

CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE contributions (
    id UUID PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id),
    language_id INT REFERENCES languages(id),
    audio_url TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE logs (
    id UUID PRIMARY KEY,
    event_type VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
