export interface UserInterface {
id:number;
email:string;
name:string;
contact:number;
role:string;
}

export interface UserLoginData {
    id: number;
    email: string;
    name: string;
    contact: number;
    role: string;
  }

export interface Order {
    userId: number;
    productId: number;
    deliveryAddress: string;
    contact: string;
  }

  export interface Cart{
    userId:number;
    productId:number;
  }