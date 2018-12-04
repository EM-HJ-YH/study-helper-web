import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBoardDetailComponent } from './group-board-detail.component';

describe('GroupBoardDetailComponent', () => {
  let component: GroupBoardDetailComponent;
  let fixture: ComponentFixture<GroupBoardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBoardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBoardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
