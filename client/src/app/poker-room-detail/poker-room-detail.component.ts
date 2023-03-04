import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-poker-room-detail',
  templateUrl: './poker-room-detail.component.html',
  styleUrls: ['./poker-room-detail.component.scss'],
})
export class PokerRoomDetailComponent {
  @Input() room: any = [];
  @Input() isShowDeleteBtn: boolean = false;
  @Input() user: any = {};
  @Output() deleteClicked = new EventEmitter<any>();

  constructor() {}

  deleteRoom() {
    this.deleteClicked.emit();
  }
}
