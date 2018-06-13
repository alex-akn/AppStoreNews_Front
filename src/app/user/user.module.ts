import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user/user.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { OtherComponent } from './other/other.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [UserComponent, WatchlistComponent, OtherComponent]
})
export class UserModule { }
