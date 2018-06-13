import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { TopmenuComponent } from './topmenu/topmenu.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FooterComponent } from './footer/footer.component';
import { PricetabsComponent } from './pricetabs/pricetabs.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [TopmenuComponent, SidemenuComponent, FooterComponent, PricetabsComponent],
  exports: [ 
    MatSidenavModule,
    MatButtonModule,
    TopmenuComponent,
    SidemenuComponent,
    FooterComponent,
    PricetabsComponent,    
    MatIconModule,
    MatTabsModule,
  ],
  providers: []
})
export class SharedModule { }
