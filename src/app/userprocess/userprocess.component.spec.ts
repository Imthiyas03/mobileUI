import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprocessComponent } from './userprocess.component';

describe('UserprocessComponent', () => {
  let component: UserprocessComponent;
  let fixture: ComponentFixture<UserprocessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserprocessComponent]
    });
    fixture = TestBed.createComponent(UserprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
