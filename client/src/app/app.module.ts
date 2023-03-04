import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CardComponent } from './card/card.component';
import { PokerTableComponent } from './poker-table/poker-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SliderModule } from 'primeng/slider';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { PokerRoomDetailComponent } from './poker-room-detail/poker-room-detail.component';
import { LoadingComponent } from './loading/loading.component';
import { Interceptor } from './http-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    PokerTableComponent,
    HomeComponent,
    LoginPageComponent,
    CardComponent,
    PokerRoomDetailComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    SliderModule,
    MenuModule,
    TableModule,
    SidebarModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
