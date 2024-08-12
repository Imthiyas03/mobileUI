import { Component } from '@angular/core';
import { Order } from 'src/app/interfaces/adminlogindata';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  error: string | null = null;
  searchQuery: string = '';

  constructor(private adminService: AuthService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.adminService.getAllOrders().subscribe(
      (data) => {
        this.orders =  data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());;
        this.filteredOrders =  data;
      },
      (error) => {
        this.error = 'Failed to load orders';
        console.error('Error loading orders:', error);
      }
    );
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredOrders = this.orders.filter(order =>
        order.orderId.toString().includes(this.searchQuery) ||
        order.product.brand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.product.model.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredOrders = this.orders;
    }
  }
}
