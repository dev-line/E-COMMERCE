export interface ProductSchema {
  id?: number;
  createdAt?: string;
  updateAt?: string;
  published?: boolean;
  name: string;
  image?: string;
  price: number;
  promo: number;
  qn?: number;
  total?: number;
  categories?: CategSchema[];
}
export interface CategSchema {
  name: string;
  id: number;
  createdAt?: string;
  updateAt?: string;
  products?: ProductSchema[];
}
export interface OrdersSchema {
  id: number;
  createdAt?: string;
  updateAt?: string;
  products?: ProductSchema[];
  delivered?: boolean;
  User?: UserSchema
}

export interface InfoSchema {
  id?: number;
  createdAt?: string;
  facebook?: string;
  Instagram?:string;
  phone?: string;
  email?: string;
  address?: string;
  about?: string;
}

export interface UserSchema {
  email: string
  id?: number
  name: string
  password?: string
  username: string
  phone: number
  ville: string
  address: string
  codePostal: number
  Commands?: OrdersSchema[]
}
