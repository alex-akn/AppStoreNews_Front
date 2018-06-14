import {Component, Input, OnInit } from '@angular/core';
import App from '../../../models/app';
import { appAnimation } from '../../../shared/animations';

@Component({
  selector: 'applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.css'],
  animations: [ appAnimation ]
  
})
export class ApplistComponent {
  @Input() apps: App[];
  //@Input() price: number;

  // private isGoodPrice(price: string): boolean{
  //   if(this.price === 0){ return true; }
  //   if(this.price === 1){ return price === 'gratis';}
  //   if(this.price === 2){ return price !== 'gratis';}
  // }

  toggleState(app:App) {
    app.state = app.state === 'shiftedRight' ? 'shiftedLeft' : 'shiftedRight';
  }
}
