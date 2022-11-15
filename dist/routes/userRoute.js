"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRoute = express_1.default.Router();
// usersRoute.route('/create').post(createUser);
usersRoute.get('/', (req, res) => {
    res.send('Hello!!!!!');
});
exports.default = usersRoute;
