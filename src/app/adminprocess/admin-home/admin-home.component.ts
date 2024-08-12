import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/userprocess/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  username!:string;
  constructor(private authService: UserService, private router: Router) {}
  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.username = user!.name;
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Navigate to home page after logout
  }
  

}
