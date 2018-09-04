import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { StickyHeaderModule } from 'atlas-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AppFooterComponent,
  AppHeaderComponent,
  MainPageComponent,
  NotFoundPageComponent,
} from './containers';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundPageComponent,
    AppHeaderComponent,
    AppFooterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    StickyHeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
