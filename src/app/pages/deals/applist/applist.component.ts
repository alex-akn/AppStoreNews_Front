import {Component, Input, OnInit } from '@angular/core';
import App from '../../../models/app';

@Component({
  selector: 'applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.css']
})
export class ApplistComponent {
  @Input() apps: App[];
  @Input() price: number;

  private isGoodPrice(price: string): boolean{
    if(this.price === 0){ return true; }
    if(this.price === 1){ return price === 'gratis';}
    if(this.price === 2){ return price !== 'gratis';}
  }
}
