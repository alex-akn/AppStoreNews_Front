import { Component, OnInit, Input } from '@angular/core';

import { IntercomService } from '../intercom.service';

import { CATEGORIES } from '../../models/categories';
import { Cat } from '../../models/cat';
import { Param } from '../../models/param';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  @Input() device: number;
  @Input() dest: string;
  categories: Cat[];  
  isMobileModeOn:boolean = false;
  catId: number = 0;

  constructor(private intercom: IntercomService) { }

  ngOnInit() {
    this.categories = this.getCategories(this.device === 3);
  }

  getCategories(isMac: boolean): Cat[]{
    return CATEGORIES.filter(cat => {
        if(isMac) {return cat.id>=12000 || cat.id===0;}
        else { return cat.id<12000; }
    });
  }

  onSelectCat(id: number){
    this.catId = id;
    this.intercom.addParam([this.newParam('genre', id)]);
  }
  onSelectDevice(dev: number){
    if((this.device !== 3 && dev === 3) ||
    (this.device === 3 && dev !== 3)){
      this.catId = 0;
    }
    this.device = dev;
    this.categories = this.getCategories(this.device === 3);
    this.intercom.addParam([this.newParam('device', dev),
      this.newParam('genre', 0)]);
  }
  newParam(name, value):Param{
    return {name:name, value:value};
  }

}
