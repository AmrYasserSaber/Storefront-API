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
            const connect = await db.connect();
            const ordersList = `${Order.ids_of_products}`.split(',');
            const quantityList = `${Order.quantity_of_each_product}`.split(',');
            const SQLOrder = `INSERT INTO Orders (id,ids_of_products,quantity_of_each_product,user_id,status)
            values ($1,$2,$3,$4,$5) returning id,ids_of_products,quantity_of_each_product,user_id,status`;
            if (Order.id) {
                throw new Error("please don't enter any id");
            }
            Order.id = uuidv1();
            for (let i = 0; i < ordersList.length; i++) {
                const SQLOrder1 = `INSERT INTO OrdersToProducts (Order_id,Product_id,quantity) values ($1,$2,$3) returning Order_id,Product_id,quantity`;
                const list = await connect.query(SQLOrder1, [
                    Order.id,
                    ordersList[i],
                    quantityList[i]
                ]);
                i += 1;
            }
            connect.release()
            const connect1 = await db.connect();
            const result = await connect1.query(SQLOrder, [
                Order.id,
                Order.ids_of_products,
                Order.quantity_of_each_product,
                Order.user_id,
                Order.status
            ]);
            connect1.release();
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
            const SQLOrder = `UPDATE Orders SET ids_of_products=$2,quantity_of_each_product=$3,user_id=$4,status=$5 WHERE id=$1  RETURNING id,ids_of_products,quantity_of_each_product,user_id,status`;
            const result = await connect.query(SQLOrder, [
                Order.id,
                Order.ids_of_products,
                Order.quantity_of_each_product,
                Order.user_id,
                Order.status
            ]);
            connect.release();
            return result.rows[0];
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
