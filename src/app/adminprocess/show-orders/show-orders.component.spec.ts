import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrdersComponent } from './show-orders.component';

describe('ShowOrdersComponent', () => {
  let component: ShowOrdersComponent;
  let fixture: ComponentFixture<ShowOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowOrdersComponent]
    });
    fixture = TestBed.createComponent(ShowOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
