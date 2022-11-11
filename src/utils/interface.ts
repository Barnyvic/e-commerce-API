export interface IUser {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    profilePicture?: string;
    active: boolean;
    isAdmin: boolean;
    verified: boolean;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICart {
    user: IUser;
    items?: [];
    bill?: number;
}

export interface Items {
    user: IUser;
    description: string;
    name: string;
    category: string;
    price: number;
}

export interface Iorder {
    owner: IUser;
    items: ICart;
    bill: number;
}

export interface IOtp {
    _id?: string;
    email: string;
    token: number;
    expired: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
