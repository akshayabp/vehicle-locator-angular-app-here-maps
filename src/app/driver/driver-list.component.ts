import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DriverService } from './driver.service';
import { Driver } from './driver';

@Component({
    templateUrl: './driver-list.component.html'
})
export class DriverListComponent implements OnInit {

    drivers: Driver[];

    constructor(private driverService: DriverService, private router: Router) { }

    ngOnInit() {
        this.getDrivers();
    }

    addDriver() {
        this.router.navigate(['/driver']);
    }

    deleteDriver(id) {
        this.driverService.deleteDriver(id).subscribe(() => {
            this.drivers = this.drivers.filter(vehicle => vehicle.id != id);
        });
    }

    private getDrivers(): void {
        this.driverService.getDrivers()
            .subscribe(vehicles => this.drivers = vehicles);
    }
}