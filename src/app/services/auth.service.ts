import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AdminLoginData, Order, Product, ProductHome, } from '../interfaces/adminlogindata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  
  private apiUrl = 'http://localhost:5164/api';
 

  constructor(private http: HttpClient) { }


  //!for admin login//////////////////////////////////////////////////////////
  login(data: AdminLoginData): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/HomePage/AdminLogin`, data, { responseType: 'text' as 'json' }).pipe(
      map((response: string) => {
        if (response === 'Admin login succes') {
          localStorage.setItem('token', 'someToken'); 
          return { success: true };
        } else {
          return { success: false, message: 'Invalid login credentials' };
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('API error:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }
  
  //!till here admin login///////////////////////////////////////////////////////////////////

  //!for get all orders ////////////////////////////////////////
  getAllOrders(): Observable<Order[]> {
    const ordersUrl = `${this.apiUrl}/AdminPage/ShowAllOrders`;
    return this.http.get<Order[]>(ordersUrl);
  }
  //!get ordes end here///////////////////////////////////////

  //!get all products admin/////////////////////////////////////////
  getProducts(): Observable<Product[]> {
    const Url = `${this.apiUrl}/AdminPage/showAllProducts`;
    return this.http.get<Product[]>(Url);
  }
  //! end of getb all products admin/////////////////////////////////

  //!  add a new product
  addProduct(formData: FormData): Observable<any> {
    const Url = `${this.apiUrl}/AdminPage/AddNewProduct`;
    return this.http.post(Url, formData);
  }
  //! add product end here

  //! for get all users in admin page
 getAllUsers(): Observable<{ message: string, users:any[] }> {
    const Url = `${this.apiUrl}/AdminPage/ShowAllUsers`;
    return this.http.get<{ message: string, users: any[] }>(Url);
  }
  //!ends hetre 

  //!for  delete product ////////////////////////////
  deleteProduct(id: number): Observable<void> {
    const Url = `${this.apiUrl}/AdminPage/RemoveProduct?id=${id}`;
    return this.http.delete<void>(Url);
  }
  //! delete product ends here///

  //! update product////////////////////////////////////
  updateProduct(id: number, productFormData: FormData): Observable<Product> {
    const url = `${this.apiUrl}/AdminPage/UpdateProduct?id=${id}`;
    return this.http.put<Product>(url, productFormData);
  }
  //! update products ends/////////////////////////////////////



  //!admin logout//////////////////////
  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //!get product for homepage
  getProductsHome(): Observable<ProductHome[]> {
    const Url = `${this.apiUrl}/UserPage/GetAllProducts`;
    return this.http.get<Product[]>(Url);
  }
  //!  end of get product for home




}
