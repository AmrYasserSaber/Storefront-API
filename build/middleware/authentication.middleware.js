"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var handelError = function (next) {
    var error = new Error('please reload');
    error.status = 401;
    next(error);
};
var checkTokenMiddleware = function (req, _res, next) {
    try {
        var authHead = req.get('Authorization');
        if (authHead) {
            var bearer = authHead.split(' ')[0].toLocaleLowerCase();
            var token = authHead.split(' ')[1];
            if (token && bearer === 'bearer') {
                var decoder = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decoder) {
                    next();
                }
                else {
                    handelError(next);
                }
            }
            else {
                handelError(next);
            }
        }
        else {
            handelError(next);
        }
    }
    catch (error) {
        handelError(next);
    }
};
exports.default = checkTokenMiddleware;
