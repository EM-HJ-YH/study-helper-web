import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleWriteComponent } from './schedule-write.component';

describe('ScheduleWriteComponent', () => {
  let component: ScheduleWriteComponent;
  let fixture: ComponentFixture<ScheduleWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
