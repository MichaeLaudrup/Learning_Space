import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderNavComponent } from './shared/components/header-nav/header-nav.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FooterComponent,
    HeaderNavComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
