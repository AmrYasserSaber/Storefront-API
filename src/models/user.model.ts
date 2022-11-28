import user from '../types/user.type';
import userWithoutPass from '../types/userWithoutPass';
import db from '../database';
import { v1 as uuidv1 } from 'uuid';
import config from '../config';
import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
    async getAllUsers(): Promise<user[]> {
        try {
            const connect = await db.connect();
            const SQLOrder = `SELECT id,user_name,firstname,lastname FROM users`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `couldn't return users ${(error as Error).message}`
            );
        }
    }
    async create(user: user): Promise<userWithoutPass> {
        try {
            const connect = await db.connect();
            const SQLOrder = `INSERT INTO users (id,user_name,firstname,lastname,password)
            values ($1,$2,$3,$4,$5) returning id,user_name,firstname,lastname`;
            if (user.id) {
                throw new Error("please don't enter any id");
            }
            user.id = uuidv1();
            const result = await connect.query(SQLOrder, [
                user.id,
                user.user_name,
                user.firstname,
                user.lastname,
                hashPassword(user.password)
            ]);
            connect.release();
            return result.rows[0];
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
            const SQLOrder = `UPDATE users SET user_name=$2,firstname=$3,lastname=$4 ,password=$5 WHERE id=$1  RETURNING id,user_name,firstname,lastname`;
            const result = await connect.query(SQLOrder, [
                user.id,
                user.user_name,
                user.firstname,
                user.lastname,
                hashPassword(user.password)
            ]);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`couldn't find user ${(error as Error).message}`);
        }
    }
    async deleteUser(id: string): Promise<user> {
        try {
            const connect = await db.connect();
            const SQLOrder = `DELETE FROM users WHERE id='${id}' RETURNING id,user_name,firstname,lastname`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`couldn't delete user ${(error as Error).message}`);
        }
    }

    async ChooseUser(id: string): Promise<user> {
        try {
            const connect = await db.connect();
            const SQLOrder = `SELECT id,user_name,firstname,lastname FROM users WHERE id='${id}'`;
            const result = await connect.query(SQLOrder);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`couldn't find user ${(error as Error).message}`);
        }
    }
    async authenticate(
        user_name: string,
        password: string
    ): Promise<user | null> {
        try {
            const connect = await db.connect();
            const SQLOrder = `SELECT password FROM users WHERE user_name='${user_name}'`;
            const result = await connect.query(SQLOrder);
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                const isValidPassword = bcrypt.compareSync(
                    `${password}${config.pepper}`,
                    hashPassword
                );
                if (isValidPassword) {
                    const userInformation = await connect.query(
                        `SELECT id,user_name,firstname,lastname FROM users WHERE user_name='${user_name}'`
                    );
                    return userInformation.rows[0];
                }
            }
            connect.release();
            return null;
        } catch (error) {
            throw new Error(`could't login : ${(error as Error).message}`);
        }
    }
}

export default UserModel;
