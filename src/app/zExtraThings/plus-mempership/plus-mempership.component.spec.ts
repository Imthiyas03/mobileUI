import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMempershipComponent } from './plus-mempership.component';

describe('PlusMempershipComponent', () => {
  let component: PlusMempershipComponent;
  let fixture: ComponentFixture<PlusMempershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlusMempershipComponent]
    });
    fixture = TestBed.createComponent(PlusMempershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
