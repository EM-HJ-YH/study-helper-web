import { Component, OnInit, Input } from '@angular/core';

import { GroupBoard } from 'src/app/models/group';

@Component({
  selector: 'app-group-board-search',
  templateUrl: './group-board-search.component.html',
  styleUrls: ['./group-board-search.component.css']
})
export class GroupBoardSearchComponent implements OnInit {
  @Input() searchPost: GroupBoard[];

  constructor() { }

  ngOnInit() {
  }

}
