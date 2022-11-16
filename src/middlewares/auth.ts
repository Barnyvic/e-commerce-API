import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/jwt';
import User from '../models/userModel'
import { errorResponse } from '../utils/response';


export const authguard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded: any = await decodeToken(token);
      const user = await User.findById(decoded.id);
      if (!user) return errorResponse(res, 404, 'user not found')
      req.user = user;
      return next();
    } else {
      return errorResponse(res, 401, 'Authorization not found')
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
}

export const verifyAdmin = async (req: Request, res: Response ,next: NextFunction) => {
  try {
    const { _id } = req.user;
    const admin = User.findOne({ _id, role: 'admin' });
    if (!admin) return errorResponse(res, 404, 'unauthorized access');
    return next()
  } catch (error:any) {
    return errorResponse(res, 500, error.message);
  }
}
  