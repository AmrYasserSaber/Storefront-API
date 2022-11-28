CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE Products(
    id uuid DEFAULT uuid_generate_v1() PRIMARY KEY,
    name VARCHAR(60) UNIQUE,
    price VARCHAR(60) NOT NULL
)