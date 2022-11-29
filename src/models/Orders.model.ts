import Order from '../types/Order';
import db from '../database';
import { v1 as uuidv1 } from 'uuid';

class OrderModel {
    async getAllOrders(): Promise<Order[]> {
        try {
            const connect = await db.connect();
            const SQLOrder = `SELECT id,ids_of_products,quantity_of_each_product,user_id,status FROM Orders`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `couldn't return Orders ${(error as Error).message}`
            );
        }
    }
    async create(Order: Order): Promise<Order> {
        try {
            const productslist = `${Order.ids_of_products}`.split(',');
            const quantityList = `${Order.quantity_of_each_product}`.split(',');
            const SQLOrder = `INSERT INTO Orders (id,user_id,status)
            values ($1,$2,$3) returning id,user_id,status`;
            if (Order.id) {
                throw new Error("please don't enter any id");
            }
            Order.id = uuidv1();
            const connect = await db.connect();
            const result = await connect.query(SQLOrder, [
                Order.id,
                Order.user_id,
                Order.status
            ]);
            for (let i = 0; i < productslist.length; i++) {
                const SQLOrder1 = `INSERT INTO OrdersToProducts (Order_id,Product_id,quantity) values ($1,$2,$3) returning Order_id,Product_id,quantity`;
                await connect.query(SQLOrder1, [
                    Order.id,
                    productslist[i],
                    quantityList[i]
                ]);
            }
            connect.release()
            return result.rows[0];
        } catch (error) {
            throw new Error(
                'Unable to create Order ' +
                    Order.id +
                    ':' +
                    (error as Error).message
            );
        }
    }
    async updateOrder(Order: Order): Promise<Order> {
        try {
            const connect = await db.connect();
            const SQLOrder = `UPDATE Orders SET user_id=$2,status=$3 WHERE id=$1  RETURNING id,user_id,status`;
            const result = await connect.query(SQLOrder, [
                Order.id,
                Order.user_id,
                Order.status
            ]);
            const SQLOrder1 = `SELECT * FROM OrdersToProducts WHERE order_id='${Order.id}'`;
            const result1 = await connect.query(SQLOrder1)
            console.log(result1)
            connect.release();
            return result.rows[0], result1.rows[0];
        } catch (error) {
            throw new Error(`couldn't find Order ${(error as Error).message}`);
        }
    }
    async deleteOrder(id: string): Promise<Order> {
        try {
            const connect = await db.connect();
            const SQLOrder = `DELETE FROM Orders WHERE id='${id}' RETURNING id,ids_of_products,quantity_of_each_product,user_id,status`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `couldn't delete Order ${(error as Error).message}`
            );
        }
    }
    async ChooseOrder(id: string): Promise<Order> {
        try {
            const connect = await db.connect();
            const SQLOrder = `SELECT id,ids_of_products,quantity_of_each_product,user_id,status FROM Orders WHERE id='${id}'`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`couldn't find Order ${(error as Error).message}`);
        }
    }
}

export default OrderModel;
