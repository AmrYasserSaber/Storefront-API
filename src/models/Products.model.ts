import Product from '../types/Product';
import db from '../database';
import { v1 as uuidv1 } from 'uuid';

class ProductModel {
    async getAllProducts(): Promise<Product[]> {
        try {
            const connect = await db.connect();
            const SQLOrder = `SELECT id,name,price FROM Products`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `couldn't return Products ${(error as Error).message}`
            );
        }
    }
    async create(Product: Product): Promise<Product> {
        try {
            const connect = await db.connect();
            const SQLOrder = `INSERT INTO Products (id,name,price)
            values ($1,$2,$3) returning id,name,price`;
            if (Product.id) {
                throw new Error("please don't enter any id");
            }
            Product.id = uuidv1();
            const result = await connect.query(SQLOrder, [
                Product.id,
                Product.name,
                Product.price
            ]);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                'Unable to create Product ' +
                    Product.name +
                    ':' +
                    (error as Error).message
            );
        }
    }
    async updateProduct(Product: Product): Promise<Product> {
        try {
            const connect = await db.connect();
            const SQLOrder = `UPDATE Products SET name=$2,price=$3 WHERE id=$1  RETURNING id,name,price`;
            const result = await connect.query(SQLOrder, [
                Product.id,
                Product.name,
                Product.price
            ]);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `couldn't find Product ${(error as Error).message}`
            );
        }
    }
    async deleteProduct(id: string): Promise<Product> {
        try {
            const connect = await db.connect();
            const SQLOrder = `DELETE FROM Products WHERE id='${id}' RETURNING id,name,price`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `couldn't delete Product ${(error as Error).message}`
            );
        }
    }

    async ChooseProduct(id: string): Promise<Product> {
        try {
            const connect = await db.connect();
            const SQLOrder = `SELECT id,name,price FROM Products WHERE id='${id}'`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `couldn't find Product ${(error as Error).message}`
            );
        }
    }
}

export default ProductModel;
