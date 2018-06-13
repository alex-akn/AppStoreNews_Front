import { Component, Input, OnInit } from '@angular/core';

import { IntercomService } from '../intercom.service';

@Component({
  selector: 'pricetabs',
  templateUrl: './pricetabs.component.html',
  styleUrls: ['./pricetabs.component.css']
})
export class PricetabsComponent implements OnInit {
  @Input() dest: string;
  price:number = 0;
  constructor(private intercom: IntercomService) { }

  ngOnInit() {
  }

  onSelectPrice(price: number){
    this.price = price;
    this.intercom.addParam([{name:'price', value:price}]);
  }

}
