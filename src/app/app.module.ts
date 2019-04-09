import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


//import { MessageModule } from './messages/message.module';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MessageComponent } from './messages/message.component';
import { MessageService } from './messages/message.service';


import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardService} from './dashboard/dashboard.service';

import {VehicleListComponent} from './vehicle/vehicle-list.component';
import {VehicleDetailComponent} from './vehicle/vehicle-detail.component';


import {VehicleService} from './vehicle/vehicle.service';
import { DriverService } from './driver/driver.service';
import { DriverListComponent } from './driver/driver-list.component';
import { DriverDetailComponent } from './driver/driver-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VehicleListComponent,
    VehicleDetailComponent,
    MessageComponent,
    DriverListComponent,
    DriverDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [VehicleService, MessageService, DriverService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
