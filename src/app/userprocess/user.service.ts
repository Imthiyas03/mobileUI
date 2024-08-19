import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Cart, Order, UserInterface, UserLoginData } from './user-interface';
import { Product } from '../interfaces/adminlogindata';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'http://localhost:5164/api';

  private currentUserSubject: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);
  public currentUser: Observable<UserInterface | null> = this.currentUserSubject.asObservable();

 
  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  getOrdersByUser(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/UserPage/GetMyOrders?userId=${userId}`;
    return this.http.get<any[]>(url);
  }

  Userlogin(email: string, password: string): Observable<UserLoginData> {
    const url = `${this.apiUrl}/Homepage/UserLogin`;
    return this.http.post<{ token: string }>(url, { email, password }).pipe(
      map(response => {
        if (response && response.token) {
          const decodedToken = this.decodeToken(response.token);
          localStorage.setItem('jwt', response.token);
          this.setCurrentUser(decodedToken);
          return decodedToken;
        } else {
          throw new Error('Token field missing in response');
        }
      }),
      catchError(error => {
        console.error('Login failed:', error.message);
        return throwError(() => new Error('Login failed, please try again later.'));
      })
    );
  }

  decodeToken(token: string): UserLoginData {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: parseInt(payload.Id, 10) || 0,
        email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '',
        name: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '',
        role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '',
        contact: parseInt(payload.Contact, 10) || 0 
      };
    }

    getProducts(): Observable<Product[]> {
      const Url = `${this.apiUrl}/UserPage/GetAllProducts`;
      return this.http.get<Product[]>(Url);
    }

  getProductDetails(productId:number): Observable<any> {
    //http://localhost:5179/api/UserPage/GetProductByid?productId=1
    const Url = `${this.apiUrl}/UserPage/GetProductByid?productId=${productId}`;
    return this.http.get<any>(Url);
  }

  UserDetail(email:string) : Observable<any>{
    //http://localhost:5179/api/UserPage/ByEmail?email=mohamedimthiyas014%40gmail.com
    const Url = `${this.apiUrl}/UserPage/ByEmail?email=${email}`;
    return this.http.post<UserLoginData>(Url, email);
  }

  createOrder(order: any): Observable<string> {
    const url = `${this.apiUrl}/OrderPage/Order`;
    return this.http.post<string>(url, order, { responseType: 'text' as 'json' });
  }

  addCart(cart: any): Observable<string> {
    const url = `${this.apiUrl}/Cart/addToCart`;
    return this.http.post<string>(url, cart, { responseType: 'text' as 'json' });
  }

  updateOrder(orderId: number, updateData: { deliveryAddress: string, contact: string }): Observable<void> {
    //http://localhost:5179/api/UserPage/EditOrder?orderId=1
    const url = `${this.apiUrl}/UserPage/EditOrder?orderId=${orderId}`;
    return this.http.patch<void>(url, updateData);
  }

  cancelOrder(orderId: number): Observable<void> {
    //http://localhost:5179/api/OrderPage/CancelOrder?orderId=1
    const url = `${this.apiUrl}/OrderPage/CancelOrder?orderId=${orderId}`;
    return this.http.put<void>(url,{});
  }

  


  registerUser(user:any): Observable<any> {
    const Url = `${this.apiUrl}/Homepage/UserRegistration`;
    return this.http.post(Url, user);
  }

  setCurrentUser(userLoginData: UserLoginData): void {
    this.currentUserSubject.next(userLoginData);
    localStorage.setItem('currentUser', JSON.stringify(userLoginData));
  }

  getCurrentUser(): UserInterface | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return token != null && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
