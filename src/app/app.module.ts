import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { AdminHomeComponent } from './adminprocess/admin-home/admin-home.component';
import { AddProductComponent } from './adminprocess/add-product/add-product.component';
import { ShowUsersComponent } from './adminprocess/show-users/show-users.component';
import { ShowOrdersComponent } from './adminprocess/show-orders/show-orders.component';
import { ShowProductsComponent } from './adminprocess/show-products/show-products.component';
import { FormsModule } from '@angular/forms';
import { HomemainComponent } from './homemain/homemain.component';
import { HomeProductsComponent } from './home-products/home-products.component';
import { UserloginComponent } from './userprocess/userlogin/userlogin.component';
import { UserprocessComponent } from './userprocess/userprocess.component';
import { UserHomeComponent } from './userprocess/user-home/user-home.component';
import { FooterComponent } from './footer/footer.component';
import { NewUserComponent } from './userprocess/new-user/new-user.component';
import { MyaccountComponent } from './userprocess/myaccount/myaccount.component';
import { MyordersComponent } from './userprocess/myorders/myorders.component';
import { OrderPageComponent } from './userprocess/order-page/order-page.component';
import { CouponsComponent } from './zExtraThings/coupons/coupons.component';
import { PlusMempershipComponent } from './zExtraThings/plus-mempership/plus-mempership.component';
import { HelpcenterComponent } from './zExtraThings/helpcenter/helpcenter.component';
import { ReviewsComponent } from './zExtraThings/reviews/reviews.component';
import { AboutusComponent } from './zExtraThings/aboutus/aboutus.component';
import { CartComponent } from './userprocess/cart/cart.component';
import { OrderFromCartComponent } from './userprocess/order-from-cart/order-from-cart.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'admin',component:AdminloginComponent},
  {path:'home',component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminloginComponent,
    AdminHomeComponent,
    AddProductComponent,
    ShowUsersComponent,
    ShowOrdersComponent,
    ShowProductsComponent,
    HomemainComponent,
    HomeProductsComponent,
    UserprocessComponent,
    UserHomeComponent,
    FooterComponent,
    NewUserComponent,
    UserloginComponent,
    MyaccountComponent,
    MyordersComponent,
    OrderPageComponent,
    CouponsComponent,
    PlusMempershipComponent,
    HelpcenterComponent,
    ReviewsComponent,
    AboutusComponent,
    CartComponent,
    OrderFromCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
