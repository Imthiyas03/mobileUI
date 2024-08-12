import { Component, OnInit } from '@angular/core';
import { UserService } from '../userprocess/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  buttonPlaceHolder?:string;

constructor(private userService:UserService,private router:Router){}

  ngOnInit(): void {
    if(this.userService.getCurrentUser()){
      this.buttonPlaceHolder='My Account';;
    }else{
      this.buttonPlaceHolder='Login';
    }
  }


toAccout() {
if(this.userService.isLoggedIn()){
   if(this.userService.getCurrentUser()?.role==='Admin'){
    this.router.navigate(['/admin-home']);
   }
   this.router.navigate(['/user-home']);
}
else{
  this.router.navigate(['/userlogin']);
}
}

toabout() {
  this.router.navigate(['/aboutus']);
}
}
