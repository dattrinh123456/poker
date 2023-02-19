import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { AuthGuardService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PokerTableComponent } from './poker-table/poker-table.component';

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: 'login',
    canActivate: [AuthGuardService],
  },
  {
    component: HomeComponent,
    path: 'home',
    canActivate: [AuthGuardService],
  },
  {
    component: PokerTableComponent,
    path: 'room/:id',
    canActivate: [AuthGuardService],
  },
  {
    component: LoginPageComponent,
    path: '**',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class AppRoutingModule {}
