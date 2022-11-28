import supertest from 'supertest';
import app from '../../index';
import db from '../../database';
import UserModel from '../../models/user.model';
import user from '../../types/user.type';

const modelUser = new UserModel();
const request = supertest(app);
let token = '';

describe('test users api', () => {
    const user_test = {
        user_name: 'user_name_test0',
        firstname: 'firstname_test',
        lastname: 'lastname_test',
        password: 'password_test'
    } as user;
    beforeAll(async () => {
        const createduser = await modelUser.create(user_test);
        user_test.id = createduser.id;
        console.log(user_test.id);
    });
    afterAll(async () => {
        const connect = await db.connect();
        const SQLORDER = 'DELETE FROM users';
        await connect.query(SQLORDER);
        connect.release();
    });
    describe('Testing the authentication route and getting the token', async () => {
        it('should authenticate to get token ', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('content-type', 'application/json')
                .send({
                    user_name: 'user_name_test0',
                    password: 'password_test'
                });
            expect(res.status).toBe(200);
            const { id, user_name, token: userToken } = res.body.data;
            expect(id).toBe(user_test.id);
            expect(user_name).toBe(user_test.user_name);
            token = userToken;
        });
        it('should fail with wrong user_name', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('content-type', 'application/json')
                .send({
                    user_name: 'wrong_user_name',
                    password: 'password_test'
                });
            expect(res.status).toBe(400);
        });
        it('should fail with wrong password', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('content-type', 'application/json')
                .send({
                    user_name: 'user_name_test0',
                    password: 'wrong_password'
                });
            expect(res.status).toBe(400);
        });
    });
    describe('Testing CRUD methods', async () => {
        it('creates user', async () => {
            const res = await request
                .post('/api/users/')
                .set('content-type', 'application/json')
                .send({
                    user_name: 'user_name_test1',
                    firstname: 'firstname_test',
                    lastname: 'lastname_test',
                    password: 'password_test'
                } as user);
            expect(res.status).toBe(200);
            const { user_name, firstname, lastname } = res.body.data;
            expect(user_name).toBe('user_name_test1');
            expect(firstname).toBe('firstname_test');
            expect(lastname).toBe('lastname_test');
        });
    });
    it('should get all users in a list', async () => {
        const res = await request
            .get('/api/users/')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.users.length).toBe(2);
    });
    it('should chosse user and get his info', async () => {
        const res = await request
            .get(`/api/users/${user_test.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.user.user_name).toBe('user_name_test0');
        expect(res.body.data.user.firstname).toBe('firstname_test');
    });
    it('should update the user', async () => {
        const res = await request
            .patch(`/api/users/${user_test.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_name: 'updated test user',
                firstname: 'updated first name',
                lastname: 'updated last name',
                id: `${user_test.id}`
            });
        expect(res.status).toBe(200);
        const { id, user_name, firstname, lastname } = res.body.data;
        expect(id).toBe(user_test.id);
        expect(user_name).toBe('updated test user');
        expect(firstname).toBe('updated first name');
        expect(lastname).toBe('updated last name');
    });
    it('should delete the user', async () => {
        const res = await request
            .delete(`/api/users/${user_test.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.user.id).toBe(user_test.id);
        expect(res.body.data.user.user_name).toBe('updated test user');
    });
});
