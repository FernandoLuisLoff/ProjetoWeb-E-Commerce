export interface IUserSigup {
  displayName: string;
  username: string;
  password: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  description: string;
  url_img: string;
  category: ICategory;
  quantity: number;
}

export interface IOrder {
  id?: number;
  totalValue: number;
  user: IUserLogin;
}

export interface IOrderItem {
  id?: number;
  totalValue: number;
  amount: number;
  order: IOrder;
  product: IProduct
}
