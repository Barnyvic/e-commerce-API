import { Request, Response } from 'express';
import Reviews from '../models/review';
import { successResponse, errorResponse, handleError } from '../utils/response';

//@desc Create a  new Reviews
//@route POST /register
//@access Private
