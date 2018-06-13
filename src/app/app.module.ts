import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { TopsComponent } from './pages/tops/tops.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login/login.component';
import { SharedModule } from './shared/shared.module';
import { DealsModule } from './pages/deals/deals.module';
import { SearchModule } from './pages/search/search.module';
import { UserModule } from './user/user.module';


import { httpInterceptorProviders } from './interceptors/index';
import { PageNotFoundComponent } from './pages/404/404.component';

import { BackendService } from './backend.service';
import { IntercomService } from './shared/intercom.service';

@NgModule({
  declarations: [
    AppComponent,    
    TopsComponent,
    LoginComponent,
    PageNotFoundComponent,    
  ],
  imports: [
    UserModule,
    LoginRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,    
    DealsModule,
    SearchModule,
    SharedModule,    
    AppRoutingModule,
  ],
  providers: [IntercomService, BackendService, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {

 }
