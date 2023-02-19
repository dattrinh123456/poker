import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  display: boolean = false;
  formGroup = new FormGroup({
    roomname: new FormControl(''),
    password: new FormControl(''),
  });
  rooms: Array<any> = []
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getAllRooms().subscribe(res=>{
      this.rooms = res
    })
  }
  createRoom() {
    console.log('payload', this.formGroup.value);
    const payload = {
      ...this.formGroup.value,
      cardsHaveChosen: [new Array(52)].map((x,index)=> index+1),
      pot: 0,
      users: []
    }
    this.homeService.createRoom(payload).subscribe(console.log)
  }

  cancel(){
    this.display = !this.display
    this.formGroup.reset()
  }
}
