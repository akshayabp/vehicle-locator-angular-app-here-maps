import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle';

@Component({
    templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

    vehicles: Vehicle[];

    constructor(private vehicleService: VehicleService, private router: Router) { }

    ngOnInit() {
        this.getVehicles();
    }

    addVehicle() {
        this.router.navigate(['/vehicle']);
    }

    deleteVehicle(id){
        this.vehicleService.deleteVehicle(id).subscribe(() => {
            this.vehicles = this.vehicles.filter(vehicle => vehicle.id != id);
        });
    }



    private getVehicles(): void {
        this.vehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = vehicles);
    }
}