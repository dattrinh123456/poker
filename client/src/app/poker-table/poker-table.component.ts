import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AppService } from '../app.service';
import { HomeService } from '../home/home.service';
import { LoginPageService } from '../login-page/login-page.service';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent implements OnInit {
  buttons: String[] = ['check', 'call', 'raise', 'fold', 'all in'];
  players: any = [];
  user: any = {};
  room: any = {};
  cards = ['1C', '13D', '12H', '11S', '7C'];
  coin: number = 10;
  isStart = false;
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private appService: AppService,
    private loginService: LoginPageService,
    private router: Router
  ) {
    this.room.id = this.route.snapshot.paramMap.get('id') || '';
    this.user = this.loginService.user;
  }

  ngOnInit(): void {
    this.appService.onNewMessage().subscribe((res) => {
      if (res == 'join' || res == 'left') {
        this.getData();
      }
    });
  }

  start() {
    this.isStart = !this.isStart;
    this.appService.start(this.room.id);
  }

  getData() {
    this.homeService.getSingleRoom(this.room.id).subscribe((res) => {
      this.room = res;
      this.user = {
        ...this.user,
        coin: res.coin,
        cards: ['', ''],
      };

      this.players = res.users
        .filter((x: any) => x.id !== this.user.id)
        .map((x: any) => ({
          name: x.name,
          cards: ['', ''],
          avatar: x.avatar,
        }));
      console.log(this.players);
    });
  }

  exit() {
    this.homeService
      .updateRoom(this.room.id, {
        users: [...this.room.users.filter((x: any) => x.id !== this.user.id)],
      })
      .subscribe((res) => {
        this.router.navigateByUrl('home');
        this.appService.leftRoom(this.room.id);
      });
  }
}
