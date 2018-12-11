import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCafeComponent } from './admin-cafe.component';

describe('AdminCafeComponent', () => {
  let component: AdminCafeComponent;
  let fixture: ComponentFixture<AdminCafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
