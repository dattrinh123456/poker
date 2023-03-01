import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { unsubscribe } from 'src/assets/common/utils';
import { AppService } from '../app.service';
import { HomeService } from '../home/home.service';
import { LoginPageService } from '../login-page/login-page.service';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent implements OnInit, OnDestroy {
  buttons: Array<any> = [
    {
      type: 'check',
      isDisable: false,
    },
    {
      type: 'call',
      isDisable: false,
    },
    {
      type: 'raise',
      isDisable: false,
    },
    {
      type: 'fold',
      isDisable: false,
    },
    {
      type: 'all in',
      isDisable: false,
    },
  ];
  players: any = [];
  user: any = {};
  room: any = {};
  cardShowOnTable = [];
  isStart = false;
  notifier = new Subject();
  isCall = false;
  isHost = false;
  coinRaise: number = 0;
  isShowResult = false;
  min = 0;
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private appService: AppService,
    private loginService: LoginPageService,
    private router: Router
  ) {
    this.room.id = this.route.snapshot.paramMap.get('id') || '';
    router.events.pipe(takeUntil(this.notifier)).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes('room')) {
          this.updateRoom();
        }
      }
    });
  }

  ngOnInit(): void {
    this.appService.joinRoom(this.room.id);

    this.appService
      .onNewMessage()
      .pipe(
        switchMap((msg: any) => {
          if (
            msg == 'join' ||
            msg == 'left' ||
            msg == 'start' ||
            msg == 'nextround' ||
            msg == 'endround'
          ) {
            return combineLatest([
              this.homeService.getSingleRoom(this.room.id),
              this.loginService.getUser(),
            ]);
          }
          return of(this.room);
        }),
        takeUntil(this.notifier)
      )
      .subscribe(([room, user]: any) => {
        this.room = room;
        this.players = [];
        this.isStart = room.isStart;
        this.isShowResult = room.isShowResult;
        room.users.forEach((x: any, index: number) => {
          let u = {
            id: x.id,
            name: x.name,
            cards: x.cards,
            avatar: x.avatar,
            isCall: index == room.userTurn,
            coins: x.coins,
            isFold: x.isFold,
            isWin: x.isWin,
            allCoins: x.allCoins,
            coinsForRound: x.coinsForRound,
            isCheck: x.isCheck,
            isAllin: x.isAllin,
          };
          if (x.id !== user.id) {
            this.players.push(u);
          } else {
            this.user = u;
            this.isHost = index == 0;
          }
        });
        this.coinRaise = this.room.coinsForTurn - this.user.coins;
        this.cardShowOnTable = this.room.cardShowOnTable;
        this.min = this.coinRaise;
        if (this.room.coinsForTurn == this.room.coins) {
          this.buttons = this.buttons.map((x) => {
            x.isDisable = x.type !== 'all in';
            return x;
          });
        } else if (this.room.coinsForTurn !== 0) {
          this.buttons = this.buttons.map((x) => {
            x.isDisable = x.type == 'check';
            return x;
          });
        } else {
          this.buttons = this.buttons.map((x) => {
            x.isDisable = false;
            return x;
          });
        }
        console.log(this.room, this.buttons);
      });
  }

  ngOnDestroy(): void {
    this.updateRoom();
    unsubscribe(this.notifier);
  }

  start() {
    this.isStart = !this.isStart;
    this.appService.start(this.room);
  }

  exit() {
    this.router.navigateByUrl('home');
  }

  updateRoom() {
    this.homeService
      .updateRoom(this.room.id, {
        users: JSON.stringify([
          ...this.room.users.filter((x: any) => x.id !== this.user.id),
        ]),
      })
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((res) => {
        this.appService.leftRoom(this.room.id);
      });
  }

  call(type: any) {
    if (type == 'fold') {
      this.user.isFold = true;
      this.user.isCheck = false;
    } else if (type == 'raise' || type == 'call') {
      this.room.coinsForTurn = this.coinRaise;
      this.user.coins += this.coinRaise;
      this.room.pot += this.coinRaise;
      this.user.isCheck = false;
    } else if (type == 'all in') {
      this.room.coinsForTurn = this.room.coins;
      this.room.pot += this.coinRaise;
      this.user.coins += this.room.coins;
      this.user.isCheck = false;
      this.user.isAllin = true;
    } else if (type == 'check') {
      this.user.isCheck = true;
    }
    for (let i = 0; i < this.room.users.length; i++) {
      if (this.room.users[i].id == this.user.id) {
        this.room.users[i] = this.user;
      }
    }

    this.appService.nextMove(type, this.room);
  }
}
