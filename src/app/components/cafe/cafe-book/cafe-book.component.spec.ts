import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeBookComponent } from './cafe-book.component';

describe('CafeBookComponent', () => {
  let component: CafeBookComponent;
  let fixture: ComponentFixture<CafeBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafeBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
