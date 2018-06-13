import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import  App  from '../../../models/app';

@Component({
  selector: 'app-detail',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() app: App;
  devices = [ 'iPhone', 'iPad', 'iOS Universal', 'Mac'];
  constructor() { }
  ngOnInit(){}
  ngOnDestroy(){
    console.log(`app ${this.app.id} destoyed`);
  }
}
