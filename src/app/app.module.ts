import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data-service';
import { AppRoutingModule } from './app-routing/app-routing.module';

import {TOASTR_TOKEN, ToastrService} from './shared/toastr.service'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      { dataEncapsulation:false, delay: 1500, caseSensitiveSearch: false, delete404: true} 
    )
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: TOASTR_TOKEN, useClass: ToastrService}
  ]
})
export class AppModule { }
