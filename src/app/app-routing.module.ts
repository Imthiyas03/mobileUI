import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminHomeComponent } from './adminprocess/admin-home/admin-home.component';
import { ShowOrdersComponent } from './adminprocess/show-orders/show-orders.component';
import { ShowProductsComponent } from './adminprocess/show-products/show-products.component';
import { AddProductComponent } from './adminprocess/add-product/add-product.component';
import { ShowUsersComponent } from './adminprocess/show-users/show-users.component';
import { AuthGuard } from './guards/auth.guard';
import { UserloginComponent } from './userprocess/userlogin/userlogin.component';
import { NewUserComponent } from './userprocess/new-user/new-user.component';
import { UserHomeComponent } from './userprocess/user-home/user-home.component';
import { MyaccountComponent } from './userprocess/myaccount/myaccount.component';
import { MyordersComponent } from './userprocess/myorders/myorders.component';
import { RoleGuard } from './userprocess/role.guard';
import { OrderPageComponent } from './userprocess/order-page/order-page.component';
import { CouponsComponent } from './zExtraThings/coupons/coupons.component';
import { PlusMempershipComponent } from './zExtraThings/plus-mempership/plus-mempership.component';
import { ReviewsComponent } from './zExtraThings/reviews/reviews.component';
import { HelpcenterComponent } from './zExtraThings/helpcenter/helpcenter.component';
import { AboutusComponent } from './zExtraThings/aboutus/aboutus.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'admin',component:AdminloginComponent},
  {path:'admin-home',
    component:AdminHomeComponent,
   canActivate: [RoleGuard],
    children:[
    { path: '', component: ShowOrdersComponent },
    { path: 'show-products', component: ShowProductsComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'show-users', component: ShowUsersComponent },
    {path:'my-account',component:MyaccountComponent},
    { path: 'show-orders', component: ShowOrdersComponent }
  ]},
  {path:'new-user',component:NewUserComponent},
  { path: 'userlogin', component: UserloginComponent},
  {path:'order-page',component:OrderPageComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'user-home',
    component:UserHomeComponent,
    canActivate:[RoleGuard],
    children:[
    {path:'',component:MyaccountComponent},
    {path:'my-orders',component:MyordersComponent},
    {path:'my-account',component:MyaccountComponent},
    {path:'coupons',component:CouponsComponent},
    {path:'plusmemper',component:PlusMempershipComponent},
    {path:'help',component:HelpcenterComponent},
    {path:'reviews',component:ReviewsComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
