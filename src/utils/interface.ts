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

export interface ICart {
    user: IUser;
    items?: [];
    bill?: number;
}

export interface Iproduct {
    id?: string;
    name?: string;
    category?: string;
    description?: string;
    image?: string;
    price?: number;
    sizes?: number;
    rating?: number;
}
// export interface Items {
//     user: IUser;
//     description: string;
//     name: string;
//     category: string;
//     price: number;
// }

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
