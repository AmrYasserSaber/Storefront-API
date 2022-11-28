"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../../database"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var modelUser = new user_model_1.default();
describe('Authentiaction', function () {
    describe('the existence of it', function () {
        it('should be defined', function () {
            expect(modelUser.authenticate).toBeDefined();
        });
    });
    describe("Authentiaction's logic", function () {
        var user_test = {
            user_name: 'user_name_test0',
            firstname: 'firstname_test',
            lastname: 'lastname_test',
            password: 'password_test'
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createduser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.create(user_test)];
                    case 1:
                        createduser = _a.sent();
                        user_test.id = createduser.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connect, SQLORDER;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        SQLORDER = 'DELETE FROM users';
                        return [4 /*yield*/, connect.query(SQLORDER)];
                    case 2:
                        _a.sent();
                        connect.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticateuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.authenticate(user_test.user_name, user_test.password)];
                    case 1:
                        authenticateuser = _a.sent();
                        expect(authenticateuser === null || authenticateuser === void 0 ? void 0 : authenticateuser.user_name).toBe(user_test.user_name);
                        expect(authenticateuser === null || authenticateuser === void 0 ? void 0 : authenticateuser.firstname).toBe(user_test.firstname);
                        expect(authenticateuser === null || authenticateuser === void 0 ? void 0 : authenticateuser.lastname).toBe(user_test.lastname);
                        return [2 /*return*/];
                }
            });
        }); });
        it('it should return null if wrong password', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticateuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.authenticate('user_name_test5', 'wrong password')];
                    case 1:
                        authenticateuser = _a.sent();
                        expect(authenticateuser).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
        it("it should return null if user_name doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticateuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.authenticate('wrong_user_name', 'password')];
                    case 1:
                        authenticateuser = _a.sent();
                        expect(authenticateuser).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe('user model methods', function () {
    describe('test there existance', function () {
        it('should have a get all users method', function () {
            expect(modelUser.getAllUsers).toBeDefined;
        });
        it('should have a get one user method', function () {
            expect(modelUser.ChooseUser).toBeDefined;
        });
        it('should have a creation method', function () {
            expect(modelUser.create).toBeDefined;
        });
        it('should have a deleting method', function () {
            expect(modelUser.deleteUser).toBeDefined;
        });
        it('should have a updating method', function () {
            expect(modelUser.updateUser).toBeDefined;
        });
    });
    describe('the logic of the user model', function () {
        var user_test = {
            user_name: 'user_name_test1',
            firstname: 'firstname_test',
            lastname: 'lastname_test',
            password: 'password_test'
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createduser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.create(user_test)];
                    case 1:
                        createduser = _a.sent();
                        user_test.id = createduser.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connect, SQLORDER;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        SQLORDER = 'DELETE FROM users';
                        return [4 /*yield*/, connect.query(SQLORDER)];
                    case 2:
                        _a.sent();
                        connect.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('create method returns a new user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user_test, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_test = {
                            user_name: 'user_name_test2',
                            firstname: 'firstname_test',
                            lastname: 'lastname_test',
                            password: 'password_test'
                        };
                        return [4 /*yield*/, modelUser.create(user_test)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: user_test.id,
                            user_name: 'user_name_test2',
                            firstname: 'firstname_test',
                            lastname: 'lastname_test'
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('get all users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        expect(users.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('choose one user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var chosenuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.ChooseUser(user_test.id)];
                    case 1:
                        chosenuser = _a.sent();
                        expect(chosenuser.id).toBe(user_test.id);
                        expect(chosenuser.user_name).toBe(user_test.user_name);
                        expect(chosenuser.firstname).toBe(user_test.firstname);
                        expect(chosenuser.lastname).toBe(user_test.lastname);
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updateuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.updateUser({
                            user_name: 'user_name_test2_updated',
                            firstname: 'firstname_test_updated',
                            lastname: 'lastname_test_updated',
                            password: 'password_test_update',
                            id: user_test.id
                        })];
                    case 1:
                        updateuser = _a.sent();
                        expect(updateuser.id).toBe(user_test.id);
                        expect(updateuser.user_name).toBe('user_name_test2_updated');
                        expect(updateuser.firstname).toBe('firstname_test_updated');
                        expect(updateuser.lastname).toBe('lastname_test_updated');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deleteduser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modelUser.deleteUser(user_test.id)];
                    case 1:
                        deleteduser = _a.sent();
                        expect(deleteduser.id).toBe(user_test.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
