"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var routes_1 = __importDefault(require("./routes"));
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var config_1 = __importDefault(require("./config"));
var database_1 = __importDefault(require("./database"));
console.log(config_1.default);
var PORT = process.env.PORT || 3000;
// create an instance server
var app = (0, express_1.default)();
//middleware to parse incomming requests
app.use(express_1.default.json());
// HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
//HTTP security middleware
app.use((0, helmet_1.default)());
//apply the rate limiting middleware to all requests
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP'
}));
app.use('/api', routes_1.default);
// add routing for / path
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World 🌍'
    });
});
database_1.default.connect().then(function (client) {
    return client
        .query('SELECT NOW()')
        .then(function (res) {
        client.release();
        console.log(res.rows);
    })
        .catch(function (err) {
        client.release();
        console.log(err.stack);
    });
});
app.use(error_middleware_1.default);
app.use(function (_req, res) {
    res.status(404).json({
        message: 'I think you have lost your way'
    });
});
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at prot:".concat(PORT));
});
exports.default = app;
