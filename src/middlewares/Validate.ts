import { Request, Response, NextFunction } from 'express';
import { handleError, validateError } from '../utils/response';
import {
  validateCreateProduct,
  validateLoginUser,
  validateSignupData,
  validateUpdateUserProfile,
} from '../validation/user';

export const validateSignupMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userPayLoad = req.body;

  try {
    const validate = validateSignupData(userPayLoad);
    if (validate.error) {
      return validateError(res, 406, validate.error?.details[0].message);
    }
    next();
  } catch (error: any) {
    handleError(req, error);
  }
};

export const validateLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userPayLoad = req.body;

  try {
    const validate = validateLoginUser(userPayLoad);
    if (validate.error) {
      return validateError(res, 406, validate.error?.details[0].message);
    }
    next();
  } catch (error: any) {
    handleError(req, error);
  }
};

export const validateUpdateUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userPayLoad = req.body;

  try {
    const validate = validateUpdateUserProfile(userPayLoad);
    if (validate.error) {
      return validateError(res, 406, validate.error?.details[0].message);
    }
    next();
  } catch (error: any) {
    handleError(req, error);
  }
};

export const validateCreateProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userPayLoad = req.body;

  try {
    const validate = validateCreateProduct(userPayLoad);
    if (validate.error) {
      return validateError(res, 406, validate.error?.details[0].message);
    }
    next();
  } catch (error: any) {
    handleError(req, error);
  }
};
