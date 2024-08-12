import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  registrationForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService,private router :Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): null | object {
    return formGroup.get('password')!.value === formGroup.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      formData.append('Email', this.registrationForm.get('email')!.value);
      formData.append('Name', this.registrationForm.get('name')!.value);
      formData.append('Password', this.registrationForm.get('password')!.value);
      formData.append('ConfirmPassword', this.registrationForm.get('confirmPassword')!.value);
      formData.append('Contact', this.registrationForm.get('contact')!.value);

      this.userService.registerUser(formData).subscribe(
        response => {
          alert('User registered successfully');
          this.router.navigate(['/userlogin']);
          console.log('User registered successfully', response);
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = 'An error occurred while registering the user.';
          console.error('Error:', error);
        }
      );
    }
  }
}