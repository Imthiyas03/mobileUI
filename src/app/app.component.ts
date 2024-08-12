import { Component, OnInit } from '@angular/core';
import { UserService } from './userprocess/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mobileUI';
  constructor(private userService: UserService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userService.setCurrentUser(JSON.parse(storedUser));
    }
  }
}
