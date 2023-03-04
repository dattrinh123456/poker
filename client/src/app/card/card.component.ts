import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cards: String[] = [];
  @Input() isFlip: boolean = false;
  @Input() isShow: boolean = false;
  @Input() hand: Array<any> = [];
  constructor() {}

  ngOnInit(): void {}
}
