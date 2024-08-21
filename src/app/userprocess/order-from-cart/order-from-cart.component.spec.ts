import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFromCartComponent } from './order-from-cart.component';

describe('OrderFromCartComponent', () => {
  let component: OrderFromCartComponent;
  let fixture: ComponentFixture<OrderFromCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFromCartComponent]
    });
    fixture = TestBed.createComponent(OrderFromCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
