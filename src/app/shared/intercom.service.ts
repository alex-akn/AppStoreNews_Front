import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

import { Param } from '../models/param';

@Injectable()
export class IntercomService {

  private paramAddedSource = new Subject<Param[]>();

  paramAdded$ = this.paramAddedSource.asObservable();

  constructor() { 
    console.log('Service Created');

  }

  addParam(param: Param[]){
    this.paramAddedSource.next(param);
  }


}
