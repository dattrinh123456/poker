import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  combineLatest,
  map,
  of,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import { shuffle, unsubscribe } from 'src/assets/common/utils';
import { AppService } from '../app.service';
import { LoginPageService } from '../login-page/login-page.service';
import { ToastService } from '../toast.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  display: boolean = false;
  display2: boolean = false;
  formGroup = new FormGroup({
    roomname: new FormControl(''),
    password: new FormControl(''),
    coins: new FormControl(100),
    isStart: new FormControl(0),
    cardsHaveChosen: new FormControl(JSON.stringify([])),
    pot: new FormControl(0),
    userTurn: new FormControl(0),
    cardShowOnTable: new FormControl(JSON.stringify([])),
    coinsForTurn: new FormControl(0),
    isShowResult: new FormControl(0),
    winner: new FormControl(JSON.stringify([])),
  });
  rooms: Array<any> = [];
  user: any = {};
  passwordJoinRoom: string = '';
  roomIsChosen: any = {};
  notifier = new Subject();
  constructor(
    private homeService: HomeService,
    private toastService: ToastService,
    private router: Router,
    private loginService: LoginPageService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.appService
      .onNewMessage()
      .pipe(
        switchMap((msg: any) => {
          console.log('msg', msg);
          if (msg == 'fetchroom') {
            return this.homeService.getAllRooms();
          }
          return of(this.rooms);
        }),
        takeUntil(this.notifier)
      )
      .subscribe((res: any) => {
        this.rooms = res;
        setTimeout(() => {
          this.checkHeight();
        }, 0);
      });

    combineLatest([this.homeService.getAllRooms(), this.loginService.getUser()])
      .pipe(takeUntil(this.notifier))
      .subscribe(([rooms, user]: any) => {
        this.rooms = rooms;
        this.user = user;
        setTimeout(() => {
          this.checkHeight();
        }, 0);
      });
  }

  ngAfterViewInit(): void {
    this.checkHeight();
  }

  ngOnDestroy(): void {
    unsubscribe(this.notifier);
  }

  createRoom() {
    if (this.rooms.find((x) => x.roomname == this.formGroup.value.roomname)) {
      this.toastService.showError(
        'The roomname has existed. Please change your room name'
      );
      return;
    }
    const payload = {
      ...this.formGroup.value,
      users: JSON.stringify([]),
      createdBy: this.user.id,
    };

    this.homeService.createRoom(payload).subscribe((res) => {
      this.rooms.push(res);
      this.resetForm();
      this.appService.fetchRooms();
    });
  }

  roomClicked(room: any) {
    if (room.createdBy === this.user.id) {
      this.passwordJoinRoom = room.password;
    }
    this.display2 = !this.display2;
    this.roomIsChosen = room;
  }

  joinRoom() {
    if (this.passwordJoinRoom == this.roomIsChosen.password) {
      this.homeService
        .getSingleRoom(this.roomIsChosen.id)
        .pipe(
          switchMap((res: any) => {
            return this.homeService.updateRoom(res.id, {
              users: JSON.stringify([
                ...res.users,
                {
                  id: this.user.id,
                  name: this.user.name,
                  cards: ['', ''],
                  avatar: this.user.avatar,
                  isCall: false,
                  coins: 0,
                  isFold: false,
                  isWin: false,
                  allCoins: 0,
                  coinsForRound: 0,
                  isCheck: false,
                  isAllin: false,
                },
              ]),
            });
          })
        )
        .subscribe((res: any) => {
          this.updateRoomUsers();
        });
    } else this.toastService.showError('The password is wrong!');
  }

  deleteRoom(room: any) {
    this.homeService.deleteRoom(room.id).subscribe((res) => {
      this.rooms = this.rooms.filter((x) => x.id !== room.id);
      this.toastService.showSuccess();
      this.appService.fetchRooms();
    });
  }

  cancel(type: string) {
    if (type == 'createRoom') this.resetForm();
    else {
      this.display2 = !this.display2;
      this.passwordJoinRoom = '';
    }
  }

  resetForm() {
    this.display = !this.display;
    this.formGroup.reset();
  }

  updateRoomUsers() {
    this.router.navigateByUrl('room/' + this.roomIsChosen.id);
  }

  checkHeight() {
    if (!window.location.href.includes('home')) return;
    let roomsClass = document.getElementsByClassName(
      'rooms'
    )[0] as HTMLDivElement;
    if (
      roomsClass.clientHeight >=
      document.getElementsByClassName('home')[0].clientHeight
    ) {
      roomsClass.style.height = '100%';
      roomsClass.style.overflowY = 'scroll';
    }
  }
}
