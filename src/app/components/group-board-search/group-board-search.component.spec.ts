import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBoardSearchComponent } from './group-board-search.component';

describe('GroupBoardSearchComponent', () => {
  let component: GroupBoardSearchComponent;
  let fixture: ComponentFixture<GroupBoardSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBoardSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBoardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
