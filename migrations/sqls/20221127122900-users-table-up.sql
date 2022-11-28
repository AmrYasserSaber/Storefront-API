CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v1() PRIMARY KEY,
    user_name VARCHAR(60) UNIQUE,
    firstname VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    password VARCHAR(300)NOT NULL 
)