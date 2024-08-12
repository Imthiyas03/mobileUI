import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { UserInterface } from '../user-interface';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  user: UserInterface  | null=null;
  error:any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }

}
