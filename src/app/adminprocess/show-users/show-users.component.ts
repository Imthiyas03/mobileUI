// src/app/components/show-users/show-users.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  userCount: number = 0;

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(response => {
      this.users = response.users; // Extract users from response
      this.filteredUsers = this.users;
    }, error => {
      console.error('Error fetching user data:', error);
    });
  }

  search(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.id.toString().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.contact.toString().includes(query)
    );
  }
}
