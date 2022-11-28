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
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var database_1 = __importDefault(require("../../database"));
var Products_model_1 = __importDefault(require("../../models/Products.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var modelUser = new user_model_1.default();
var modelProduct = new Products_model_1.default();
var request = (0, supertest_1.default)(index_1.default);
var token = '';
describe('test Products api', function () {
    var user_test = {
        user_name: 'user_name_test0',
        firstname: 'firstname_test',
        lastname: 'lastname_test',
        password: 'password_test'
    };
    var Product_test = {
        name: 'Product_test',
        price: 5
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createduser, createProduct, res, userToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, modelUser.create(user_test)];
                case 1:
                    createduser = _a.sent();
                    user_test.id = createduser.id;
                    return [4 /*yield*/, modelProduct.create(Product_test)];
                case 2:
                    createProduct = _a.sent();
                    Product_test.id = createProduct.id;
                    return [4 /*yield*/, request
                            .post('/api/users/authenticate')
                            .set('content-type', 'application/json')
                            .send({
                            user_name: 'user_name_test0',
                            password: 'password_test'
                        })];
                case 3:
                    res = _a.sent();
                    userToken = res.body.data.token;
                    token = userToken;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connect, SQLORDER, SQLORDER1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connect = _a.sent();
                    SQLORDER = 'DELETE FROM users';
                    SQLORDER1 = 'DELETE FROM Products';
                    return [4 /*yield*/, connect.query(SQLORDER)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connect.query(SQLORDER1)];
                case 3:
                    _a.sent();
                    connect.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Testing CRUD methods', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            it('creates Product', function () { return __awaiter(void 0, void 0, void 0, function () {
                var res, _a, name, price;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, request
                                .post('/api/Products/')
                                .set('content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(token))
                                .send({
                                name: 'name_test1',
                                price: 1
                            })];
                        case 1:
                            res = _b.sent();
                            expect(res.status).toBe(200);
                            _a = res.body.data, name = _a.name, price = _a.price;
                            expect(name).toBe('name_test1');
                            expect(price).toBe('1');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should get all Products in a list', function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, request
                                .get('/api/Products/')
                                .set('content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(token))];
                        case 1:
                            res = _a.sent();
                            expect(res.status).toBe(200);
                            expect(res.body.data.Products.length).toBe(2);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should chosse Product and get his info', function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, request
                                .get("/api/Products/".concat(Product_test.id))
                                .set('content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(token))];
                        case 1:
                            res = _a.sent();
                            expect(res.status).toBe(200);
                            expect(res.body.data.Product.name).toBe('Product_test');
                            expect(res.body.data.Product.price).toBe('5');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should update the Product', function () { return __awaiter(void 0, void 0, void 0, function () {
                var res, _a, id, name, price;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, request
                                .patch("/api/Products/".concat(Product_test.id))
                                .set('content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(token))
                                .send({
                                name: 'updated test Product',
                                price: 12,
                                id: "".concat(Product_test.id)
                            })];
                        case 1:
                            res = _b.sent();
                            expect(res.status).toBe(200);
                            _a = res.body.data, id = _a.id, name = _a.name, price = _a.price;
                            expect(id).toBe(Product_test.id);
                            expect(name).toBe('updated test Product');
                            expect(price).toBe('12');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should delete the Product', function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, request
                                .delete("/api/Products/".concat(Product_test.id))
                                .set('content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(token))];
                        case 1:
                            res = _a.sent();
                            expect(res.status).toBe(200);
                            expect(res.body.data.Product.id).toBe(Product_test.id);
                            expect(res.body.data.Product.name).toBe('updated test Product');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
