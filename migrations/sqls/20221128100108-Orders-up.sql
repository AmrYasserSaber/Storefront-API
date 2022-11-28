CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE Orders(
    id uuid DEFAULT uuid_generate_v1() PRIMARY KEY,
    user_id VARCHAR(60) NOT NULL,
    status VARCHAR(200) NOT NULL
)