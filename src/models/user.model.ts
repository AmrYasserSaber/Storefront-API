import user from '../types/user.type';
import db from '../database';
import { v1 as uuidv1 } from 'uuid';

class UserModel {
    async getAllUsers(): Promise<user[]> {
        try {
            const connect = await db.connect();
            const SQLOrder = `SELECT id,firstname,lastname FROM users`;
            const result = await connect.query(SQLOrder);
            connect.release()
            return result.rows;
        } catch (error) {
            throw new Error(
                `couldn't return users ${(error as Error).message}`
            );
        }
    }
    async create(user: user): Promise<user> {
        try {
            const connect = await db.connect();
            const SQLOrder = `INSERT INTO users (id,firstname,lastname,password)
            values ($1,$2,$3,$4) returning id,firstname,lastname`;
            if (user.id) {
                throw new Error("please don't enter any id");
            }
            user.id = uuidv1();
            const result = await connect.query(SQLOrder, [
                user.id,
                user.firstname,
                user.lastname,
                user.password
            ]);
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(
                'Unable to create user ' +
                    user.firstname +
                    ':' +
                    (error as Error).message
            );
        }
    }
    async updateUser(user: user): Promise<user> {
        try {
            const connect = await db.connect();
            const SQLOrder = `UPDATE users SET firstname=$1,lastname=$2 ,password=$3 WHERE id=$4  RETURNING id,firstname,lastname`;
            const result = await connect.query(SQLOrder,[
                user.firstname,
                user.lastname,
                user.password,
                user.id
            ]);
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`couldn't find user ${(error as Error).message}`);
        }
    }
    async deleteUser(id: string): Promise<user> {
        try {
            const connect = await db.connect();
            const SQLOrder = `DELETE FROM users WHERE id='${id}' RETURNING id,firstname,lastname`;
            const result = await connect.query(SQLOrder)
            connect.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`couldn't delete user ${(error as Error).message}`);
        }
    }

    async ChooseUser(id: string): Promise<user> {
        try {
            console.log('hi')
            console.log(id)
            const connect = await db.connect();
            const SQLOrder = `SELECT id,firstname,lastname FROM users WHERE id='${id}'`;
            const result = await connect.query(SQLOrder);
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`couldn't find user ${(error as Error).message}`);
        }
    }
}

export default UserModel;
