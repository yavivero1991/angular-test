import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemComponent } from './components/item/item.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routing';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContentInterceptor } from './interceptors/content.interceptor';
import { ItemsService } from './services/items.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ItemsComponent,
    ItemComponent,
    HomeComponent,
    ToolbarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgbModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    ItemsService,
    { provide: HTTP_INTERCEPTORS, useClass: ContentInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
