export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  profilePicture?: string;
  active: boolean;
  role: string;
  isAdmin: boolean;
  verified: boolean;
  phone?: string;
  cart?: [any];
  orders?: [Iorder];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CustomRequest {
  user: IUser;
  file: object;
  params: object;
  query: object;
  path: object;
}

export interface ICart {
  userId: IUser;
  products?: [];
  bill?: number;
}

export interface Iproduct {
  owner?: IUser;
  name?: string;
  category?: [string];
  description?: string;
  image?: string;
  price?: number;
  sizes?: number;
  rating?: number;
  instock?: boolean;
  review?: IReview;
}

export interface Iorder {
  owner: IUser;
  items: ICart;
  orderId: number;
  vendorId?: number;
  item?: [any];
  totalAmount: number;
  paidAmount: number;
  orderDate: Date;
  orderStatus: string;
  remark: string;
}

export interface IOtp {
  _id?: string;
  email: string;
  token: number;
  expired: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReview extends IUser, Iproduct {
  user: IUser;
  product: Iproduct;
  text: string;
}
