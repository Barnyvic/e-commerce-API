import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import { IOtp, IUser } from '../utils/interface';
import Users from '../models/userModel';
import OTP from '../models/Otp';
import { otp } from '../utils/generateOtp';
import { errorResponse, handleError } from '../utils/response';

//@desc Register new user
//@route POST /register
//@access Public

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, phone, confirmPassword } =
            req.body;

        //    making sure all fields are valid
        if (
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !phone ||
            !confirmPassword
        ) {
            return errorResponse(res, 400, 'Please Fill empty fields');
        }
        //   confirming password
        if (password !== confirmPassword) {
            return errorResponse(res, 400, 'PassWord must Match');
        }

        const emialExist = await Users.findOne({ email });
        if (emialExist)
            return errorResponse(
                res,
                409,
                'email already in use by another user'
            );

        const phoneExist = await Users.findOne({ phone });

        if (phoneExist)
            return errorResponse(
                res,
                409,
                'Phone Number already in use by another user'
            );

        await Users.create({
            firstName,
            lastName,
            email,
            phone,
            password,
        });
    } catch (error) {
        handleError(req, error);
        return errorResponse(res, 500, 'Server error.');
    }
};
