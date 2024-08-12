import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit{

  orders: any[] = [];
  userId!: number;
  isEditModalOpen = false;
  editOrder: any = {}; // To store the order being edited

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.loadOrdersByUser(this.userId);
    } else {
      console.error('User not found');
    }
  }

  loadOrdersByUser(userId: number): void {
    this.userService.getOrdersByUser(userId).subscribe(
      data => {
        this.orders =  data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());;
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  confirmCancelOrder(orderId: number): void {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      this.userService.cancelOrder(orderId).subscribe(
        () => {
          this.orders = this.orders.filter(order => order.id !== orderId);
          alert('Order canceled successfully.');
        },
        error => {
          console.error('Error canceling order:', error);
        }
      );
    }
  }

  openEditModal(order: any): void {
    this.editOrder = { ...order };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  updateOrder(): void {
    this.userService.updateOrder(this.editOrder.id, {
      deliveryAddress: this.editOrder.deliveryAddress,
      contact: this.editOrder.contact
    }).subscribe(
      () => {
        this.loadOrdersByUser(this.userId); // Reload orders to reflect changes
        this.closeEditModal();
        alert('Order updated successfully.');
      },
      error => {
        console.error('Error updating order:', error);
      }
    );
  }

  isButtonDisabled(order: string): boolean {
    return order === 'Cancelled';
  }
}
