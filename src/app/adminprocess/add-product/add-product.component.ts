import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/userprocess/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService,private userservice :UserService) {
    this.productForm = this.fb.group({
      brand: [''],
      model: ['', Validators.required],
      price: ['', Validators.required],
      ram: ['', Validators.required],
      rom: ['', Validators.required],
      processor: [''],
      batteryCapacity: [''],
      image: [null],
      sellerid:['']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        image: file
      });
    }
  }

  ngOnInit(): void {
    const sellerid=this.userservice.getCurrentUser()?.id;
    if(sellerid){
      this.productForm.patchValue({
          sellerid : sellerid
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.value).forEach(key => {
        formData.append(key, this.productForm.value[key]);
      });

      this.authService.addProduct(formData).subscribe(
        response => {
          console.log('Product added successfully:', response);
          this.successMessage = 'Product added successfully';
          this.productForm.reset();
          setTimeout(() => {
            this.successMessage = null;
          }, 3000); // Clear the success message after 3 seconds
        },
        error => {
          this.errorMessage = 'An error occurred while adding the product.';
          console.error('Error:', error);
        }
      );
    }
  }
}
