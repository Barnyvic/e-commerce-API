import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import { IOtp, IUser } from '../utils/interface';
// import sendEmail from '../service/mailgun';
import sendEmail from '../utils/email';
import otpGenerator from 'otp-generator';
import Users from '../models/userModel';
import OTP from '../models/Otp';
import { successResponse, errorResponse, handleError } from '../utils/response';
import { hashPassword, comparePassword } from '../utils/hash';

export const createVendor = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      confirmPassword,
      role,
    } = req.body;

    //    making sure all fields are valid
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !confirmPassword ||
      !role
    ) {
      return errorResponse(res, 400, 'Please Fill empty fields');
    }
    //   confirming password
    if (password !== confirmPassword) {
      return errorResponse(res, 400, 'PassWord must Match');
    }

    const emialExist = await Users.findOne({ email });
    if (emialExist)
      return errorResponse(res, 409, 'email already in use by another user');

    const phoneExist = await Users.findOne({ phone });

    if (phoneExist)
      return errorResponse(
        res,
        409,
        'Phone Number already in use by another user'
      );

    const hash = await hashPassword(password);

    // save user to db
    const vendor = await Users.create({
      firstName,
      lastName,
      email,
      phone,
      password: hash,
      role,
    });

    // generate otp
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);

    await OTP.create({ email, token: otp });
    const subject = 'Vendor created';
    const message = `hi, thank you for signing up kindly verify your account with this token ${otp}`;
    console.log(subject);
    await sendEmail(email, subject, message);

    return successResponse(
      res,
      201,
      'Account created successfully, kindly verify your email and login.',
      vendor
    );
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const user = await Users.findById(_id);
    if (!user) return errorResponse(res, 404, 'User not found');
    user.active = false;
    const result = await user.save();
    return successResponse(res, 200, 'user deactivated', result);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};
