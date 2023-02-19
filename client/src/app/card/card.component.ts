import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent  implements OnInit{
  @Input() cards: String[] = []
  @Input() isShow:boolean = false
  isFlip = false

  constructor() {
  }

  ngOnInit(): void {
  }

}
