import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import App from '../../models/app';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  withRefresh = false;
  apps$: Observable<App[]>;
  private searchText$ = new Subject<string>();

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  search(searchTerm: string) {
    this.searchText$.next(searchTerm);
  }

  ngOnInit() {
    // this.apps$ = this.searchText$.pipe(
    //   debounceTime(1500),
    //   distinctUntilChanged(),
    //   switchMap( term =>
    //     this.backend.searchApps('deals', term))
    // );

    this.apps$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.backend.searchApps(params.get('where'), params.get('what')))
    );
  }

}
