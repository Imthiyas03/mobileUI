import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  username:string |undefined;
  constructor(private router: Router,private userService:UserService) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/']); 
  }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();

      this.username = user!.name;
  }


}
