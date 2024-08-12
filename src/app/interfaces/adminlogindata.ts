export interface AdminLoginData {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    success: boolean;
    message: string;
  }

  export interface AuthLoginResponse {
    token: string;
  }
  export interface ProductHome {
    brand: string;
    model: string;
    price: number;
    imageURL: string;
  }

  export interface Product {
    productId: number;
    brand: string;
    model: string;
    price: number;
    ram: number;
    rom: number;
    processor: string;
    batteryCapacity: number;
    imageURL: string;
  }
  
  export interface Order {
    orderId: number;
    orderDate: string;
    expectedDelivery: string;
    userId: number;
    productId: number;
    product: Product;
    orderStatus: string;
    totalAmount: number;
    payment: string;
    paymentStatus: string;
    deliveryAddress: string;
    contact: string;
    paymentMode:string;
  }
  
  