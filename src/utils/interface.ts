export interface Iuser {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    profilePicture?: string;
    active: boolean;
    role?: string;
    verified: boolean;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICart {
    user: Iuser;
    items?: [];
    bill?: number;
}

export interface Items {
    user: Iuser;
    description: string;
    name: string;
    category: string;
    price: number;
}

export interface Iorder {
    owner: Iuser;
    items: ICart;
    bill: number;
}
