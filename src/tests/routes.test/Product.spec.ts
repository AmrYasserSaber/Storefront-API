import supertest from 'supertest';
import app from '../../index';
import db from '../../database';
import ProductModel from '../../models/Products.model';
import user from '../../types/user.type';
import Product from '../../types/Product';
import UserModel from '../../models/user.model';

const modelUser = new UserModel();
const modelProduct = new ProductModel();
const request = supertest(app);
let token = '';

describe('test Products api', () => {
    const user_test = {
        user_name: 'user_name_test0',
        firstname: 'firstname_test',
        lastname: 'lastname_test',
        password: 'password_test'
    } as user;
    const Product_test = {
        name: 'Product_test',
        price: 5
    } as Product;
    beforeAll(async () => {
        const createduser = await modelUser.create(user_test);
        user_test.id = createduser.id;
        const createProduct = await modelProduct.create(Product_test);
        Product_test.id = createProduct.id;
        const res = await request
            .post('/api/users/authenticate')
            .set('content-type', 'application/json')
            .send({
                user_name: 'user_name_test0',
                password: 'password_test'
            });
        const { token: userToken } = res.body.data;
        token = userToken;
    });
    afterAll(async () => {
        const connect = await db.connect();
        const SQLORDER = 'DELETE FROM users';
        const SQLORDER1 = 'DELETE FROM Products';
        await connect.query(SQLORDER);
        await connect.query(SQLORDER1);
        connect.release();
    });
    describe('Testing CRUD methods', async () => {
        it('creates Product', async () => {
            const res = await request
                .post('/api/Products/')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'name_test1',
                    price: 1
                } as Product);
            expect(res.status).toBe(200);
            const { name, price } = res.body.data;
            expect(name).toBe('name_test1');
            expect(price).toBe('1');
        });
        it('should get all Products in a list', async () => {
            const res = await request
                .get('/api/Products/')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.Products.length).toBe(2);
        });
        it('should chosse Product and get his info', async () => {
            const res = await request
                .get(`/api/Products/${Product_test.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.Product.name).toBe('Product_test');
            expect(res.body.data.Product.price).toBe('5');
        });
        it('should update the Product', async () => {
            const res = await request
                .patch(`/api/Products/${Product_test.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'updated test Product',
                    price: 12,
                    id: `${Product_test.id}`
                });
            expect(res.status).toBe(200);
            const { id, name, price } = res.body.data;
            expect(id).toBe(Product_test.id);
            expect(name).toBe('updated test Product');
            expect(price).toBe('12');
        });
        it('should delete the Product', async () => {
            const res = await request
                .delete(`/api/Products/${Product_test.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.Product.id).toBe(Product_test.id);
            expect(res.body.data.Product.name).toBe('updated test Product');
        });
    });
});
