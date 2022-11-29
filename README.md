Connect the database:

1-CREATE USER store_user WITH PASSWORD 'password';//to create a user
2-CREATE DATABASE storefront;//to create the main database
3-CREATE DATABASE storefront_test;//to create the testing database
4-GRANT ALL PRIVILEGES ON DATABASE stoe_front TO store_user;//to make the user access and change the database freely
5-GRANT ALL PRIVILEGES ON DATABASE stoefront_test TO store_user;//to make the user access and change the database freely




.env setup:

PORT=3000
NODE_ENV=dev
POSTGRES_HOST = 127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=storefront
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=store_user
POSTGRES_PASSWORD=password
BCRYPT_PASSWORD=speak-friend-and-enter
SALT_ROUNDS=10
TOKEN_SECRET=this-is-a-secret-token


npm installation of th dependencies:
1-prettier
2-eslint
3-db-migrate
4-nodemon
5-jasmine
6-bcrypt
7-dotenv
8-express
9-express-rate-limit
10-helmet
11-jsonwebtoken
12-morgan
13-pg
14-supertest
15-uuid

routes :
1-/api/users
2-/api/users/authenticate
3-/api/Products
4-api/Orders

CRUD:
1-creat user by ----------- http//localhost:3000/api/users ----- post order -----body {"user_name":"example","firstname":"example","lastname":"example","password":"example"}
2-authenticate user by -------------http/localhost:3000/api/users/authenticate ------ post order ----------body {"user_name":"example","password":"example"} -----get the token
3-update user by -------localhost:3000/api/users/{user id get it when you create user} ------ patch order -------body {"id":"user id","user_name":"example","firstname":"example","lastname":"example"}----don't forget the token
4-get all users by ---------http//localhost:3000/api/users ---- get order ----- no body ----- don't forget the token
5-delete a user by --------localhost:3000/api/users/{user id get it when you create user} ----- delete order -----body{"user_name":"example","password":"example"} ---- don't forget the auth


the same for Products and Orders


Schcema:


Table "public.users"
  Column   |          Type          | Collation | Nullable |      Default
-----------+------------------------+-----------+----------+--------------------
 id        | uuid                   |           | not null | uuid_generate_v1()
 user_name | character varying(60)  |           |          |
 firstname | character varying(60)  |           | not null |
 lastname  | character varying(60)  |           | not null |
 password  | character varying(300) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_user_name_key" UNIQUE CONSTRAINT, btree (user_name)
Table "public.products"
 Column |         Type          | Collation | Nullable |      Default
--------+-----------------------+-----------+----------+--------------------
 id     | uuid                  |           | not null | uuid_generate_v1()
 name   | character varying(60) |           |          |
 price  | character varying(60) |           | not null |
Indexes:
"products_pkey" PRIMARY KEY, btree (id)
"products_name_key" UNIQUE CONSTRAINT, btree (name)



Table "public.orders"
 Column  |          Type          | Collation | Nullable |      Default
---------+------------------------+-----------+----------+--------------------
 id      | uuid                   |           | not null | uuid_generate_v1()
 user_id | character varying(60)  |           | not null |
 status  | character varying(200) |           | not null |
Indexes:
"orders_pkey" PRIMARY KEY, btree (id)


