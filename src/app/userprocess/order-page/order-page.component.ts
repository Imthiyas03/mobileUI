import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orderForm: FormGroup;
  productDetails: any = {};
  showPlaceOrderButton: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      userId: ['', Validators.required],
      productId: ['', Validators.required],
      houseno: ['', Validators.required],
      street: [''],
      area: [''],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      contact: ['', Validators.required],
      paymentMode: ['', Validators.required],
      upiId: [''],
      cardNumber: [''],
      cardHolderName: [''],
      cvv: [''],
      expiryDate: [''],
      bankName: [''],
      accountHolderName: [''],
      ifsc: [''],
      accountNumber: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['productId'];
      const userId = params['userId'];

      if (productId && userId) {
        this.orderForm.patchValue({
          userId: userId,
          productId: productId
        });
        this.fetchProductDetails(productId); // Fetch product details
      }
    });
  }

  fetchProductDetails(productId:number): void {
    this.userService.getProductDetails(productId).subscribe(
      response => {
        this.productDetails = response;
      },
      error => {
        console.error('Error fetching product details', error);
      }
    );
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formValues = this.orderForm.value;
      const order = {
        userId: formValues.userId,
        productId: formValues.productId,
        deliveryAddress: `${formValues.houseno}, ${formValues.street}, ${formValues.area}, ${formValues.city}, ${formValues.district}, ${formValues.state}`,
        contact: formValues.contact,
        paymentMode: formValues.paymentMode
      };
      this.userService.createOrder(order).subscribe(
        response => {
          console.log('Order created successfully', response);
          alert(response);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error creating order', error);
        }
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      this.orderForm.markAllAsTouched();
    }
  }

  onClear(): void {
    this.orderForm.reset();
    // Optionally, you might want to clear product details
    this.productDetails = {};
  }

  onCancel(): void {
    this.router.navigate(['/']); // Redirect to homepage or any other route
  }

  confirmPlaceOrder(): void {
    if (window.confirm('Are you sure you want to place this order?')) {
      this.onSubmit();
    }
  }

  confirmPayNow(): void {
    if (window.confirm('Are you sure you want to proceed with this payment method?')) {
      this.showPlaceOrderButton = true;
    }
  }

  onPaymentModeChange(): void {
    const paymentMode = this.orderForm.get('paymentMode')?.value;
    if (paymentMode === 'CashOnDelivery') {
      this.showPlaceOrderButton = true;
    } else {
      this.showPlaceOrderButton = false;
    }
  }

  confirmClear(): void {
    if (window.confirm('Are you sure you want to clear the form?')) {
      this.orderForm.reset();
    }
  }

  confirmCancel(): void {
    if (window.confirm('Are you sure you want to cancel and go back?')) {
      this.router.navigate(['/']); // Or any other route you want to navigate to
    }
  }
}
