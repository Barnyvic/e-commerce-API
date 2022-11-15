import express, { Request, Response } from 'express';
import { createUser } from '../controllers/userController';
const usersRoute = express.Router();

usersRoute.route('/create').post(createUser);

export default usersRoute;
