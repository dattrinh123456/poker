import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss']
})
export class PokerTableComponent {
  buttons : String[] = ['check', 'call', 'raise', 'fold']
  players = [
    {
      name:'dat1',
      cards: ['1S','2S']
    },
    {
      name:'dat1',
      cards: ['1S','2S']
    },
    {
      name:'dat1',
      cards: ['1S','2S']
    },
    {
      name:'dat1',
      cards: ['1S','2S']
    },
    {
      name:'dat1',
      cards: ['1S','2S']
    }
  ]
  user = {
    name:'DAT',
    cards:['2H','3H']
  }
  roomId = ''
  cards = ['1C','13D','12H','11S','7C']
  constructor(private appService:AppService){
    // this.appService.sendMessage(this.roomId)
  }


}
