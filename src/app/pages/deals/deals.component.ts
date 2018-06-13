import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

import { ActivatedRoute } from '@angular/router';

import { Subscription, Observable, Subject } from 'rxjs';
import { map, merge, switchMap } from 'rxjs/operators';

import { BackendService } from '../../backend.service';
import { IntercomService } from '../../shared/intercom.service';

import App from '../../models/app';
import { Param } from '../../models/param';
import { CATEGORIES } from '../../models/categories';

const paths = {'deals':'pdrops', 'deals-mac':'pdrops', 'new-apps':'news'};

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit, OnDestroy {
  device: number = 2;
  genre: number = 0;
  price: number = 0;
  limit: number = 10;
  //offset: number = 0;
  lang:string = 'de'
  apps: App[] = [];
  destination:string;

  mobileQuery: MediaQueryList;

  subscription: Subscription;
  private moreSource = new Subject<number>();
  private moreObservable$ = this.moreSource.asObservable();

  private _mobileQueryListener: () => void;

  constructor(
    private backend: BackendService,
    private intercom: IntercomService,
    private activatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
    //Subscribe to User choosing param and merge with 
    //Load More click event observable
    this.subscription = intercom.paramAdded$
    .subscribe(this.handleAddedParams.bind(this), err => console.log(err));
    //.pipe(merge(this.offsetObservable$))
    //.switchMap(this.handleAddedParams.bind(this))
    this.moreObservable$
    .pipe(switchMap(this.getMoreApps.bind(this)))
    .subscribe(this.prepareApps.bind(this), err => console.log(err));

    //
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.activatedRoute.url.pipe(map(url => url[0].path))
    .subscribe(this.initializeComponent.bind(this));    
  }

  initializeComponent(path:string){
    console.log(path);
    this.destination = path;
    if(path === 'deals-mac') {this.device = 3}
    this.loadMore();
  }

  handleAddedParams(params: Param[]){    
    params.forEach(param => {      
      this[param.name] = param.value;
    })
    this.refresh();
    //return Observable.of();
  }

  refresh(){
    if(this.apps === undefined){
      return;
    }
    let visibleApps = 0;
    this.apps.forEach(app => {      
      const isCat = this.genre === 0
     || app.genres.indexOf(`${this.genre}`) !== -1;
      const isPrice = this.isGoodPrice(app.newprice);      
      const isDevice = this.isEligibleDevice(+app.device);
      console.log(isCat, isPrice, isDevice);     
      if(isCat && isPrice && isDevice) {
        app.isActive = true;
        visibleApps++;
      }
      else  { app.isActive = false; }
    });  
    console.log(visibleApps);  
    if(visibleApps < this.limit) {      
      //this.isLoading = true;
      this.moreSource.next(this.limit - visibleApps);  
    }
  }

  private isGoodPrice(price: string): boolean{
    if(this.price === 0){ return true; }
    if(this.price === 1){ return price === 'gratis';}
    if(this.price === 2){ return price !== 'gratis';}
  }
  private isEligibleDevice(device:number): boolean{    
    if(this.device === 2) { return device !== 3; }
    if(this.device === 1) { return device === 1 || device === 2; }
    if(this.device === 0) { return device === 0 || device === 2; }
    if(this.device === 3) { return device === 3; }    
  }

  getMoreApps(param:number){    
    return this.backend.getMoreApps(this.prepareParams(param));
  }

  prepareApps(data: App[]){
    if(this.apps === undefined) this.apps = [];
    data.forEach((app:App) => {
      if(this.apps.every(a => a.id != app.id)) { 
        app.catNames = this.fromIdToNames(app.genres);
        app.isActive = true;
        //app.maxWidth = this.maxWidth;                
        this.apps.push(app);
      }      
    });
    
    console.log(this.apps);
  }

  //Converts ids into names
  //returns first 2??
  fromIdToNames(genres:any[]):string{
    let output = "";    
    genres.forEach(genre => {
      CATEGORIES.forEach(cat => {
        if(cat['id'] === +genre){ output = `${output}, ${cat['name']}`; }
      })      
    })
    return output.slice(2);
  }
 
  prepareParams(limit:number):Param[]{
    const offset = this.getNumberOfVisibleApps();
    return [
      {name:'action', value:paths[this.destination]}, //Required  
      {name:'limit', value:limit},                    //Required
      {name:'offset', value:offset},                  //Required
      {name:'genre', value:this.genre},
      {name:'price', value:this.price},
      {name:'device', value:this.device},
      {name:'country', value:this.lang},
    ]
  }

  getNumberOfVisibleApps():number{
    let offset = 0;
    this.apps.forEach(app => {      
      if(app.isActive) {offset++;}
    });    
    return offset;
  }
  
  //Emits a new value from loadMoreSource observable
  loadMore(){    
    this.moreSource.next(this.limit);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
    console.log('Component destroyed');
  }
}
