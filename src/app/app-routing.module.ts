import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VehicleListComponent} from './vehicle/vehicle-list.component';
import {VehicleDetailComponent} from './vehicle/vehicle-detail.component';

import { MessageComponent } from './messages/message.component';
import { DriverListComponent } from './driver/driver-list.component';
import { DriverDetailComponent } from './driver/driver-detail.component';



const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent
  },
  {
    path: 'vehicles', 
    component: VehicleListComponent
  },
   {
    path: 'vehicle', 
    component: VehicleDetailComponent
  },
  {
    path: 'vehicle/:id', 
    component: VehicleDetailComponent
  }, 

  {
    path: 'drivers', 
    component: DriverListComponent
  },

  {
    path: 'driver', 
    component: DriverDetailComponent
  },
  {
    path: 'driver/:id', 
    component: DriverDetailComponent
  }, 
   
  {
    path: '', redirectTo: 'dashboard', 
    pathMatch: 'full'
  },
  {
    path: '**', 
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
