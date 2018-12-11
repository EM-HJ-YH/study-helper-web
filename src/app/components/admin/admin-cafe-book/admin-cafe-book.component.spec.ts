import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCafeBookComponent } from './admin-cafe-book.component';

describe('AdminCafeBookComponent', () => {
  let component: AdminCafeBookComponent;
  let fixture: ComponentFixture<AdminCafeBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCafeBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCafeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
