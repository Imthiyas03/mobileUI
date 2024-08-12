import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserLoginData } from '../user-interface';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.Userlogin(email, password).subscribe({
        next: (response: UserLoginData) => {
          if (response.role === 'Admin') {
            this.router.navigate(['admin-home']);
          } else if(response.role==='User'){
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.loginError = 'Invalid Username or Password';
        }
      });
    }
  }

  goToSignup(): void {
    this.router.navigate(['/new-user']);
  }
}
