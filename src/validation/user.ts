import Joi from 'joi';
import { Iproduct, IUser } from '../utils/interface';

// when the user signs up
export const validateSignupData = (user: IUser) => {
  const shcema = Joi.object({
    firstName: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'))
      .required(),
    confirmPassword: Joi.ref('password'),
    phone: Joi.string().min(9).max(15),
  });
  return shcema.validate(user);
};

// when the user logs in
export const validateLoginUser = (login: {
  email: string;
  password: string;
}) => {
  const loginShcema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return loginShcema.validate(login);
};

export const validateUpdateUserProfile = (updateProfile: IUser) => {
  const UpdateProfileshcema = Joi.object({
    firstName: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'))
      .required(),
    confirmPassword: Joi.ref('password'),
    phone: Joi.string().min(9).max(15),
  });
  return UpdateProfileshcema.validate(updateProfile);
};

export const validateCreateProduct = (products: Iproduct) => {
  const shcema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    category: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    sizes: Joi.array().items(Joi.string().required()),
    rating: Joi.string().min(9).max(15),
  });
  return shcema.validate(products);
};
