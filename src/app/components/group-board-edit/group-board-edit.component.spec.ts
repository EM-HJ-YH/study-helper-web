import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBoardEditComponent } from './group-board-edit.component';

describe('GroupBoardEditComponent', () => {
  let component: GroupBoardEditComponent;
  let fixture: ComponentFixture<GroupBoardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBoardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBoardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
