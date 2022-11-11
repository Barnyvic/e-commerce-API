import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import { IOtp, IUser } from '../utils/interface';
import Users from '../models/userModel';
import OTP from '../models/Otp';
import { otp } from '../utils/generateOtp';
