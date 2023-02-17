import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PokerTableComponent } from './poker-table/poker-table.component';

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: 'login'
  },
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    component: PokerTableComponent,
    path: 'room/:id'
  },
  {
    component: LoginPageComponent,
    path: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
