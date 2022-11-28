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
var database_1 = __importDefault(require("../database"));
var uuid_1 = require("uuid");
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.getAllOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connect, SQLOrder, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        SQLOrder = "SELECT id,ids_of_products,quantity_of_each_product,user_id,status FROM Orders";
                        return [4 /*yield*/, connect.query(SQLOrder)];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("couldn't return Orders ".concat(error_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.create = function (Order) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, ordersList, quantityList, SQLOrder, i, SQLOrder1, list, connect1, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        ordersList = "".concat(Order.ids_of_products).split(',');
                        quantityList = "".concat(Order.quantity_of_each_product).split(',');
                        SQLOrder = "INSERT INTO Orders (id,ids_of_products,quantity_of_each_product,user_id,status)\n            values ($1,$2,$3,$4,$5) returning id,ids_of_products,quantity_of_each_product,user_id,status";
                        if (Order.id) {
                            throw new Error("please don't enter any id");
                        }
                        Order.id = (0, uuid_1.v1)();
                        console.log(ordersList);
                        console.log(quantityList);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < ordersList.length)) return [3 /*break*/, 5];
                        SQLOrder1 = "INSERT INTO OrdersToProducts (Order_id,Product_id,quantity) values ($1,$2,$3) returning Order_id,Product_id,quantity";
                        return [4 /*yield*/, connect.query(SQLOrder1, [
                                Order.id,
                                ordersList[i],
                                quantityList[i]
                            ])];
                    case 3:
                        list = _a.sent();
                        i += 1;
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        connect.release();
                        return [4 /*yield*/, database_1.default.connect()];
                    case 6:
                        connect1 = _a.sent();
                        return [4 /*yield*/, connect1.query(SQLOrder, [
                                Order.id,
                                Order.ids_of_products,
                                Order.quantity_of_each_product,
                                Order.user_id,
                                Order.status
                            ])];
                    case 7:
                        result = _a.sent();
                        connect1.release();
                        return [2 /*return*/, result.rows[0]];
                    case 8:
                        error_2 = _a.sent();
                        throw new Error('Unable to create Order ' +
                            Order.id +
                            ':' +
                            error_2.message);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.updateOrder = function (Order) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, SQLOrder, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        SQLOrder = "UPDATE Orders SET ids_of_products=$2,quantity_of_each_product=$3,user_id=$4,status=$5 WHERE id=$1  RETURNING id,ids_of_products,quantity_of_each_product,user_id,status";
                        return [4 /*yield*/, connect.query(SQLOrder, [
                                Order.id,
                                Order.ids_of_products,
                                Order.quantity_of_each_product,
                                Order.user_id,
                                Order.status
                            ])];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("couldn't find Order ".concat(error_3.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.deleteOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, SQLOrder, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        SQLOrder = "DELETE FROM Orders WHERE id='".concat(id, "' RETURNING id,ids_of_products,quantity_of_each_product,user_id,status");
                        return [4 /*yield*/, connect.query(SQLOrder)];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("couldn't delete Order ".concat(error_4.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.ChooseOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, SQLOrder, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        SQLOrder = "SELECT id,ids_of_products,quantity_of_each_product,user_id,status FROM Orders WHERE id='".concat(id, "'");
                        return [4 /*yield*/, connect.query(SQLOrder)];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("couldn't find Order ".concat(error_5.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.default = OrderModel;
