import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBoardWriteComponent } from './group-board-write.component';

describe('GroupBoardWriteComponent', () => {
  let component: GroupBoardWriteComponent;
  let fixture: ComponentFixture<GroupBoardWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBoardWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBoardWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
