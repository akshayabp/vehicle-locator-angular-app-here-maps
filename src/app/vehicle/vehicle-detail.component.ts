
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle';

@Component({
    templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent implements OnInit {
    vehicle: Vehicle;

    constructor(private vehicleService: VehicleService,private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let id = +this.route.snapshot.paramMap.get('id');

        if(id){
            this.vehicleService.getVehicle(id).subscribe(vehicle => {
                this.vehicle = vehicle;
            });
        }else{
            this.initVehicle();
        }

        
    }

    private initVehicle(): void {
        this.vehicle = new Vehicle();
    }

    save(): void {

        if(this.vehicle.id){
            this.vehicleService.updateVehicle(this.vehicle).subscribe(()=>{
                this.router.navigate(['vehicles']);
            });
        }else{
            this.vehicleService.addVehicle(this.vehicle).subscribe(()=>{
                this.router.navigate(['vehicles']);
            });
        }

         
    }

    cancel(): void {
        this.router.navigate(['vehicles']);
    }
}