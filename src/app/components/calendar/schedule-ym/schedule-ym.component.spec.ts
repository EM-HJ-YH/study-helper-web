import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleYmComponent } from './schedule-ym.component';

describe('ScheduleYmComponent', () => {
  let component: ScheduleYmComponent;
  let fixture: ComponentFixture<ScheduleYmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleYmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleYmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
