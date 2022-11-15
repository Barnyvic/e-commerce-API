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
    const user = await Users.create({
      firstName,
      lastName,
      email,
      phone,
      password: hash,
    });

    // generate otp
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.create({ email, token: otp });
    const subject = 'User created';
    const message = `hi, thank you for signing up kindly verify your account with this token ${otp}`;

    await sendEmail(email, subject, message);

    return successResponse(
      res,
      201,
      'Account created successfully, kindly verify your email and login.',
      user
    );
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return errorResponse(res, 400, 'please fill all fields');
    const user = await Users.findOne({ email });
    if (!user) return errorResponse(res, 404, 'user not found');
    const isPassword = await comparePassword( password,user.password);
    if (!isPassword) return errorResponse(res, 400, 'incorrect password');
    const token = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return successResponse(res, 200, 'user logged in successfully', {
      user,
      token,
    });
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};
