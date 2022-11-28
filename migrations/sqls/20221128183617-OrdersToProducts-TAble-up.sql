CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE OrdersToProducts(
    Order_id uuid REFERENCES Orders(id) ON DELETE CASCADE,
    Product_id uuid REFERENCES Products(id) ON DELETE CASCADE,
    quantity INTEGER,
    PRIMARY KEY (Order_id,Product_id)
)