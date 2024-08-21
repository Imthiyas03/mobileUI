import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any[] = [];
  userId!: number;

  constructor(private userService: UserService,private router:Router) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.loadCartByUser(this.userId);
    } else {
      console.error('User not found');
    }
  }

  loadCartByUser(userId: number): void {
    this.userService.getCart(userId).subscribe(
      data => {
        this.carts = data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      },
      error => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  getTotalPrice(): number {
    return this.carts.reduce((total, cart) => total + cart.product.price, 0);
  }

  removeFromCart(cartId: number): void {
    if (window.confirm('Are you sure you want to remove this from cart?')) {
      this.userService.removeFromCart(cartId).subscribe(
        () => {
          alert('Product removed successfully.');
          //below code for auto refresh
          const currentUrl = this.router.url;    
          this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(() =>
            {this.router.navigate([currentUrl]); })
        },
        error => {
          console.error('Error canceling order:', error);
        }
      );
    }
  }

  removeAllItems(): void {
    if (window.confirm('Are you sure you want to remove all product from cart?')) {
      this.userService.RemoveAllFromCart(this.userService.getCurrentUser()!.id).subscribe(
        () => {
          alert('Order canceled successfully.');
          //below code for auto refresh
          const currentUrl = this.router.url;    
          this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(() =>
            {this.router.navigate([currentUrl]); })
        },
        error => {
          console.error('Error canceling order:', error);
        }
      );
    }
  }

  buyNow(product: any): void {
    if (this.userService.isLoggedIn()) {
      const userId = this.userService.getCurrentUser()?.id;
      const productId=product.productId;
      this.router.navigate(['order-page'], { queryParams: { productId, userId } });
      console.log('Buy Now clicked for', product);
    }
    else {
      this.router.navigate(['/userlogin']);
      console.log('Buy Now clicked for', product);
    }
  }
}
