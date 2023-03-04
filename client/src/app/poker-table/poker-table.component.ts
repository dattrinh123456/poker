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
  tap,
} from 'rxjs';
import { unsubscribe } from 'src/assets/common/utils';
import { AppService } from '../app.service';
import { HomeService } from '../home/home.service';
import { LoginPageService } from '../login-page/login-page.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent implements OnInit, OnDestroy {
  buttons: Array<{
    type: string;
    isDisable: boolean;
  }> = [
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
      type: 'all in',
      isDisable: false,
    },
  ];
  players: any = [];
  user: any = {};
  room: any = {};
  cardShowOnTable = [];
  isStart: boolean = false;
  notifier = new Subject();
  isHost: boolean = false;
  coinRaise: number = 0;
  isShowResult: boolean = false;
  min: number = 0;
  visibleDetail: boolean = false;
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private appService: AppService,
    private loginService: LoginPageService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.room.id = this.route.snapshot.paramMap.get('id') || '';
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
        let indexHost = room.users.findIndex((x: any) => x.isActive);
        room.users.forEach((x: any, index: number) => {
          if (!x.isActive) return;
          let u = {
            id: x.id,
            name: x.name,
            cards: x.cards,
            avatar: x.avatar,
            isTurn: index == room.userTurn,
            coins: x.coins,
            isFold: x.isFold,
            isWin: x.isWin,
            allCoins: x.allCoins,
            isAllin: x.isAllin,
            isActive: x.isActive,
            isWatching: x.isWatching,
          };
          if (x.id !== user.id) {
            this.players.push(u);
          } else {
            this.user = u;
            this.isHost = index == indexHost;
          }
        });
        this.coinRaise = this.room.coinsForTurn - this.user.coins;
        this.cardShowOnTable = this.room.cardShowOnTable;
        this.min = this.coinRaise;
        this.sliderChange();
      });
  }

  ngOnDestroy(): void {
    console.log(1);
    this.updateRoom();
  }

  start() {
    if (this.room.users.filter((x: any) => x.isActive).length <= 1) {
      this.toastService.showWarn('The room need more than 1 people to start!');
      return;
    }
    this.isStart = !this.isStart;
    this.appService.start(this.room);
  }

  exit() {
    this.router.navigateByUrl('home');
  }

  updateRoom() {
    let users = this.room.users.map((x: any) => {
      if (x.id == this.user.id) {
        x.isActive = false;
        x.isFold = true;
        x.isWatching = false;
      }
      return x;
    });
    if (this.room.isStart) {
      this.checkCountTurn();
    }

    this.homeService
      .updateRoom(this.room.id, {
        users: JSON.stringify([...users]),
      })
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        takeUntil(this.notifier)
      )
      .subscribe((res) => {
        this.appService.nextMove('fold', this.room);
        this.appService.leftRoom(this.room.id);
        unsubscribe(this.notifier);
      });
  }

  call(type: any) {
    if (type == 'all in') {
      this.coinRaise = this.room.coins;
    }

    if (this.coinRaise > this.room.coinsForTurn) {
      this.room.countTurn = this.room.users.findIndex(
        (x: any) => x.id == this.user.id
      );
    }

    if (type == 'fold') {
      this.user.isFold = true;
      this.checkCountTurn();
    } else if (type == 'call') {
      this.room.pot += this.coinRaise;
      this.user.coins += this.coinRaise;
      this.user.allCoins -= this.coinRaise;
    } else if (type == 'raise') {
      this.room.coinsForTurn = Math.max(
        this.coinRaise,
        ...this.room.users.map((x: any) => x.coins)
      );
      this.room.pot += this.coinRaise;
      this.user.coins += this.coinRaise;
      this.user.allCoins -= this.coinRaise;
    } else if (type == 'all in') {
      this.room.coinsForTurn = this.room.coins;
      this.room.pot += this.room.coins;
      this.user.coins += this.room.coins;
      this.user.isAllin = true;
      this.user.allCoins -= this.room.coins;
    }
    for (let i = 0; i < this.room.users.length; i++) {
      if (this.room.users[i].id == this.user.id) {
        this.room.users[i] = this.user;
        break;
      }
    }
    console.log(this.room);
    this.appService.nextMove(type, this.room);
  }

  sliderChange() {
    if (
      this.room.coins == this.coinRaise ||
      this.room.coins == this.room.coinsForTurn
    ) {
      this.buttons = this.buttons.map((x) => {
        x.isDisable = x.type !== 'all in';
        return x;
      });
    } else if (
      this.room.coinsForTurn >= this.coinRaise &&
      this.coinRaise !== 0
    ) {
      this.buttons = this.buttons.map((x) => {
        x.isDisable = x.type == 'check';
        return x;
      });
    } else if (this.coinRaise > this.room.coinsForTurn) {
      this.buttons = this.buttons.map((x) => {
        x.isDisable = x.type == 'check' || x.type == 'call';
        return x;
      });
    } else {
      this.buttons = this.buttons.map((x) => {
        x.isDisable = false;
        return x;
      });
    }
  }

  checkCountTurn() {
    if (
      this.room.countTurn ==
      this.room.users.findIndex((x: any) => x.id == this.user.id)
    ) {
      this.room.countTurn = -1;
    }
  }
}
