import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-order-from-cart',
  templateUrl: './order-from-cart.component.html',
  styleUrls: ['./order-from-cart.component.css']
})
export class OrderFromCartComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: any[] = [];
  showPlaceOrderButton: boolean = false;
  banks = ['Indian Bank', 'Indian Overses Bank', 'Citibank', 'HDFC','State Bank of India'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      userId: ['', Validators.required],
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
    const userId=this.userService.getCurrentUser()?.id
    this.userService.getCart(userId!).subscribe(
      response => {
        this.cartItems = response;
      },
      error => {
        console.error('Error fetching cart items', error);
      }
    );
  }



  onSubmit(): void {
    if (!this.orderForm.valid) {
      const formValues = this.orderForm.value;
      const order = {
        userId: this.userService.getCurrentUser()?.id,
        deliveryAddress: `${formValues.houseno}, ${formValues.street}, ${formValues.area}, ${formValues.city}, ${formValues.district}, ${formValues.state}`,
        contact: formValues.contact,
        paymentMode: formValues.paymentMode,
      };
      this.userService.OrderFromCart(order).subscribe(
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
      this.orderForm.markAllAsTouched();
    }
  }

  onClear(): void {
    this.orderForm.reset();
    this.cartItems = [];
  }

  onCancel(): void {
    this.router.navigate(['/']);
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
    this.showPlaceOrderButton = paymentMode === 'CashOnDelivery';
  }

  confirmClear(): void {
    if (window.confirm('Are you sure you want to clear the form?')) {
      this.onClear();
    }
  }

  confirmCancel(): void {
    if (window.confirm('Are you sure you want to cancel and go back?')) {
      this.onCancel();
    }
  }
}
