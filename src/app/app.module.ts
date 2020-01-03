import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { from, zip, range } from 'rxjs';
import { map, take, filter, toArray } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
