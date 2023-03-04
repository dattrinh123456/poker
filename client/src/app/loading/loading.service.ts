import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class LoadingService {
  loading = new Subject();

  constructor(private http: HttpClient) {}

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
