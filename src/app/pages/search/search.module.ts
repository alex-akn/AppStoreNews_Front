import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { DealsModule } from '../deals/deals.module';

@NgModule({
  imports: [
    CommonModule,
    DealsModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
