import { Component, Input, OnInit } from '@angular/core';
import { getCard } from '../../assets/common/utils';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cards: String[] = [];
  @Input() isFlip: boolean = false;
  @Input() isShow: boolean = false;

  constructor() {}

  ngOnInit(): void {}

}
