# Storefront API

This is the documentation for the Storefront API, which allows you to manage users, products, and orders.

## Database Setup

1. Create a user with the following command:


2. Create the main database:


3. Create the testing database:


4. Grant all privileges on the main database to the store_user:


5. Grant all privileges on the testing database to the store_user:


## .env Setup

Create a `.env` file in the root directory of the project and add the following configurations:

PORT=3000
NODE_ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=storefront
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=store_user
POSTGRES_PASSWORD=password
BCRYPT_PASSWORD=speak-friend-and-enter
SALT_ROUNDS=10
TOKEN_SECRET=this-is-a-secret-token


## Dependencies

Make sure to install the following dependencies using npm:

npm install prettier eslint db-migrate nodemon jasmine bcrypt dotenv express express-rate-limit helmet jsonwebtoken morgan pg supertest uuid


## Routes

1. **/api/users**

   - **POST**: Create a new user.
     - Endpoint: `http://localhost:3000/api/users`
     - Request body:
       ```
       {
           "user_name": "example",
           "firstname": "example",
           "lastname": "example",
           "password": "example"
       }
       ```

2. **/api/users/authenticate**

   - **POST**: Authenticate a user and retrieve a token.
     - Endpoint: `http://localhost:3000/api/users/authenticate`
     - Request body:
       ```
       {
           "user_name": "example",
           "password": "example"
       }
       ```

3. **/api/products**

   - **GET**: Get all products.
     - Endpoint: `http://localhost:3000/api/products`

4. **/api/orders**

   - **POST**: Create a new order.
     - Endpoint: `http://localhost:3000/api/orders`
     - Request body:
       ```
       {
           "user_id": "user_id",
           "status": "example"
       }
       ```

## CRUD Operations

1. **Create User**

   - HTTP Method: POST
   - Endpoint: `http://localhost:3000/api/users`
   - Request body:
     ```
     {
         "user_name": "example",
         "firstname": "example",
         "lastname": "example",
         "password": "example"
     }
     ```

2. **Authenticate User**

   - HTTP Method: POST
   - Endpoint: `http://localhost:3000/api/users/authenticate`
   - Request body:
     ```
     {
         "user_name": "example",
         "password": "example"
     }
     ```

3. **Update User**

   - HTTP Method: PATCH
   - Endpoint: `http://localhost:3000/api/users/{user_id}`
   - Request body:
     ```
     {
         "id": "user_id",
         "user_name": "example",
         "firstname": "example",
         "lastname": "example"
     }
     ```

     **Note**: Don't forget to include the token in the request headers for authorization.

4. **Get All Users**

   - HTTP Method: GET
   - Endpoint: `http://localhost:3000/api/users`
   - Request headers:
     ```
     Authorization: Bearer {token}
     ```
     **Note**: Replace `{token}` with the actual token received from user authentication.

5. **Delete User**

   - HTTP Method: DELETE
   - Endpoint: `http://localhost:3000/api/users/{user_id}`
   - Request body:
     ```
     {
         "user_name": "example",
         "password": "example"
     }
     ```

     **Note**: Don't forget to include the token in the request headers for authorization.

Similar CRUD operations can be performed for Products and Orders by using the respective endpoints mentioned above.

## Database Schema

### Table "public.users"

| Column     | Type                   | Collation | Nullable | Default           |
| ---------- | ---------------------- | --------- | -------- | ----------------- |
| id         | uuid                   |           | not null | uuid_generate_v1()|
| user_name  | character varying(60)  |           |          |                   |
| firstname  | character varying(60)  |           | not null |                   |
| lastname   | character varying(60)  |           | not null |                   |
| password   | character varying(300) |           | not null |                   |

Indexes:
- "users_pkey" PRIMARY KEY, btree (id)
- "users_user_name_key" UNIQUE CONSTRAINT, btree (user_name)

### Table "public.products"

| Column | Type                   | Collation | Nullable | Default           |
| ------ | ---------------------- | --------- | -------- | ----------------- |
| id     | uuid                   |           | not null | uuid_generate_v1()|
| name   | character varying(60)  |           |          |                   |
| price  | character varying(60)  |           | not null |                   |

Indexes:
- "products_pkey" PRIMARY KEY, btree (id)
- "products_name_key" UNIQUE CONSTRAINT, btree (name)

### Table "public.orders"

| Column   | Type                   | Collation | Nullable | Default           |
| ---------| ---------------------- | --------- | -------- | ----------------- |
| id       | uuid                   |           | not null | uuid_generate_v1()|
| user_id  | character varying(60)  |           | not null |                   |
| status   | character varying(200) |           | not null |                   |

Indexes:
- "orders_pkey" PRIMARY KEY, btree (id)

Feel free to update this README file with any additional information or instructions as needed.


