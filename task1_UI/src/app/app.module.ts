import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './errorHandle/error-interceptor.service';
import { OrderComponent } from './order/order.component';
import { DatePipe } from '@angular/common';
import { ListComponent } from './list/list.component';



 class CustomErrorHandler implements ErrorHandler{
  handleError(error: any): void {
    console.log('An error occured',error)
  }
 }

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    ListComponent,
 
 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  
  providers: [DatePipe,{provide:ErrorHandler,useClass:CustomErrorHandler},{provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
