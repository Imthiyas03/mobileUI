import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.css']
})
export class HelpcenterComponent {
  supportForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.supportForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.supportForm.valid) {
      // Simulate form submission success
      this.successMessage = 'Your message has been sent successfully!';
      this.errorMessage = null;
      this.supportForm.reset();
    } else {
      this.successMessage = null;
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
