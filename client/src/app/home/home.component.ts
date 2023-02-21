import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { LoginPageService } from '../login-page/login-page.service';
import { ToastService } from '../taost.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  display: boolean = false;
  display2: boolean = false;
  formGroup = new FormGroup({
    roomname: new FormControl(''),
    password: new FormControl(''),
  });
  rooms: Array<any> = [];
  user: any = {};
  passwordJoinRoom: string = '';
  coins: number = 100;
  roomIsChosen: any = {};
  constructor(
    private homeService: HomeService,
    private toastService: ToastService,
    private router: Router,
    private loginSevice: LoginPageService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.homeService.getAllRooms().subscribe((res) => {
      this.rooms = res;
    });
    this.user = this.loginSevice.user;
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
      cardsHaveChosen: [...new Array(52)].map((x, index) => index + 1),
      pot: 0,
      users: [this.user],
      createdBy: this.user.id,
    };
    this.homeService.createRoom(payload).subscribe((res) => {
      this.rooms.push(res);
      this.router.navigateByUrl('room/' + res.id);
      this.appService.joinRoom(res.id);
      this.resetForm();
    });
  }

  roomClicked(room: any) {
    if (room.createdBy === this.user.id) {
      this.router.navigateByUrl('room/' + room.id);
      return;
    }
    this.display2 = !this.display2;
    this.roomIsChosen = room;
  }

  joinRoom() {
    const isUserInRoom =
      this.roomIsChosen.users.findIndex((x: any) => x.id == this.user.id) >= 0;
    if (this.passwordJoinRoom == this.roomIsChosen.password && !isUserInRoom) {
      this.homeService
        .updateRoom(this.roomIsChosen.id, {
          users: [...this.roomIsChosen.users, this.user],
        })
        .subscribe((res) => {
          this.updateRoomUsers();
        });
    } else if (
      this.passwordJoinRoom == this.roomIsChosen.password &&
      isUserInRoom
    ) {
      this.updateRoomUsers();
    } else this.toastService.showError('The password is wrong!');
  }

  deleteRoom(room: any) {
    this.homeService.deleteRoom(room.id).subscribe((res) => {
      this.rooms = this.rooms.filter((x) => x.id !== room.id);
      this.toastService.showSuccess();
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
    this.appService.joinRoom(this.roomIsChosen.id);
    this.router.navigateByUrl('room/' + this.roomIsChosen.id);
  }
}
