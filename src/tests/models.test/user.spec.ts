import db from '../../database';
import user from '../../types/user.type';
import UserModel from '../../models/user.model';

const modelUser = new UserModel();

describe('Authentiaction', () => {
    describe('the existence of it', () => {
        it('should be defined', () => {
            expect(modelUser.authenticate).toBeDefined();
        });
    });
    describe(`Authentiaction's logic`, () => {
        const user_test = {
            user_name: 'user_name_test0',
            firstname: 'firstname_test',
            lastname: 'lastname_test',
            password: 'password_test'
        } as user;
        beforeAll(async () => {
            const createduser = await modelUser.create(user_test);
            user_test.id = createduser.id;
        });
        afterAll(async () => {
            const connect = await db.connect();
            const SQLORDER = 'DELETE FROM users';
            await connect.query(SQLORDER);
            connect.release();
        });
        it('should return the user', async () => {
            const authenticateuser = await modelUser.authenticate(
                user_test.user_name as string,
                user_test.password as string
            );
            expect(authenticateuser?.user_name).toBe(user_test.user_name);
            expect(authenticateuser?.firstname).toBe(user_test.firstname);
            expect(authenticateuser?.lastname).toBe(user_test.lastname);
        });
        it('it should return null if wrong password', async () => {
            const authenticateuser = await modelUser.authenticate(
                'user_name_test5',
                'wrong password'
            );
            expect(authenticateuser).toBe(null);
        });
        it(`it should return null if user_name doesn't exist`, async () => {
            const authenticateuser = await modelUser.authenticate(
                'wrong_user_name',
                'password'
            );
            expect(authenticateuser).toBe(null);
        });
    });
});

describe('user model methods', () => {
    describe('test there existance', () => {
        it('should have a get all users method', () => {
            expect(modelUser.getAllUsers).toBeDefined;
        });
        it('should have a get one user method', () => {
            expect(modelUser.ChooseUser).toBeDefined;
        });
        it('should have a creation method', () => {
            expect(modelUser.create).toBeDefined;
        });
        it('should have a deleting method', () => {
            expect(modelUser.deleteUser).toBeDefined;
        });
        it('should have a updating method', () => {
            expect(modelUser.updateUser).toBeDefined;
        });
    });
    describe('the logic of the user model', () => {
        const user_test = {
            user_name: 'user_name_test1',
            firstname: 'firstname_test',
            lastname: 'lastname_test',
            password: 'password_test'
        } as user;
        beforeAll(async () => {
            const createduser = await modelUser.create(user_test);
            user_test.id = createduser.id;
        });
        afterAll(async () => {
            const connect = await db.connect();
            const SQLORDER = 'DELETE FROM users';
            await connect.query(SQLORDER);
            connect.release();
        });
        it('create method returns a new user', async () => {
            const user_test = {
                user_name: 'user_name_test2',
                firstname: 'firstname_test',
                lastname: 'lastname_test',
                password: 'password_test'
            } as user;
            const result = await modelUser.create(user_test);
            expect(result).toEqual({
                id: user_test.id,
                user_name: 'user_name_test2',
                firstname: 'firstname_test',
                lastname: 'lastname_test'
            });
        });
        it('get all users', async () => {
            const users = await modelUser.getAllUsers();
            expect(users.length).toBe(2);
        });
        it('choose one user', async () => {
            const chosenuser = await modelUser.ChooseUser(
                user_test.id as string
            );
            expect(chosenuser.id).toBe(user_test.id);
            expect(chosenuser.user_name).toBe(user_test.user_name);
            expect(chosenuser.firstname).toBe(user_test.firstname);
            expect(chosenuser.lastname).toBe(user_test.lastname);
        });
        it('updates user', async () => {
            const updateuser = await modelUser.updateUser({
                user_name: 'user_name_test2_updated',
                firstname: 'firstname_test_updated',
                lastname: 'lastname_test_updated',
                password: 'password_test_update',
                id: user_test.id
            });
            expect(updateuser.id).toBe(user_test.id);
            expect(updateuser.user_name).toBe('user_name_test2_updated');
            expect(updateuser.firstname).toBe('firstname_test_updated');
            expect(updateuser.lastname).toBe('lastname_test_updated');
        });
        it('should delete user', async () => {
            const deleteduser = await modelUser.deleteUser(
                user_test.id as string
            );
            expect(deleteduser.id).toBe(user_test.id);
        });
    });
});
