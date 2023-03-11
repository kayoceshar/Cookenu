-- Active: 1674164268204@@35.226.146.116@3306@jbl-4416383-kayo-santos

CREATE TABLE IF NOT EXISTS Cookenu_users(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM("ADMIN","NORMAL") NOT NULL DEFAULT "NORMAL"
);


CREATE TABLE IF NOT EXISTS Cookenu_recipe(
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id VARCHAR(255),
    FOREIGN KEY (author_id) REFERENCES Cookenu_users(id)
);

CREATE TABLE IF NOT EXISTS Cookenu_friends(
    id VARCHAR(255) PRIMARY KEY,
    user_1_id VARCHAR(255) NOT NULL,
    user_2_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_1_id) REFERENCES Cookenu_users (id),
    FOREIGN KEY (user_2_id) REFERENCES Cookenu_users (id)
);