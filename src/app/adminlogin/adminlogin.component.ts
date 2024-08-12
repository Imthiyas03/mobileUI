import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AdminLoginData } from '../interfaces/adminlogindata';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: AdminLoginData = this.loginForm.value;
      console.log('Login data:', loginData);
      console.log('AuthService:', this.authService); // Check if AuthService is correctly injected
  
      this.authService.login(loginData).subscribe(
        response => {
          console.log('Response:', response);
          if (response.success) {
            console.log('Login successful, navigating to admin-home');
            this.router.navigate(['admin-home']).then(success => {
              console.log('Navigation success:', success);
            }).catch(err => {
              console.log('Navigation error:', err);
            });
          } else {
            this.errorMessage = response.message || 'Invalid username or password';
            console.log('Error message:', this.errorMessage);
          }
        },
        error => {
          this.errorMessage = 'Invalid username or passeword';
          console.log('Error:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }  
  
  
}
