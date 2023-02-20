import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent implements OnInit {
  buttons: String[] = ['check', 'call', 'raise', 'fold', 'all in'];
  players = [
    {
      name: 'dat1',
      cards: ['1S', '2S'],
    },
    {
      name: 'dat1',
      cards: ['1S', '2S'],
    },
    {
      name: 'dat1',
      cards: ['1S', '2S'],
    },
    {
      name: 'dat1',
      cards: ['1S', '2S'],
    },
    {
      name: 'dat1',
      cards: ['1S', '2S'],
    },
  ];
  user: any = {};
  room: any = {};
  cards = ['1C', '13D', '12H', '11S', '7C'];
  coin: number = 10;
  isStart = false;
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.room.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.homeService.getSingleRoom(this.room.id).subscribe((res) => {
      this.room = res;
      this.user = {
        name: res.createdBy,
        coin: res.coin,
        cards: ['', ''],
      };
    });
  }

  start() {
    //start
    this.isStart = !this.isStart;
    this.appService.start(this.room.id)
  }
}
