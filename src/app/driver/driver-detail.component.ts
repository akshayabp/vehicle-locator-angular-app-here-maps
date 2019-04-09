
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { DriverService } from './driver.service';
import { Driver } from './driver';

@Component({
    templateUrl: './driver-detail.component.html'
})
export class DriverDetailComponent implements OnInit {
    driver: Driver;

    constructor(private driverService: DriverService,private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let id = +this.route.snapshot.paramMap.get('id');

        if(id){
            this.driverService.getDriver(id).subscribe(vehicle => {
                this.driver = vehicle;
            });
        }else{
            this.initDriver();
        }        
    }

    private initDriver(): void {
        this.driver = new Driver();
    }

    save(): void {

        if(this.driver.id){
            this.driverService.updateDriver(this.driver).subscribe(()=>{
                this.router.navigate(['drivers']);
            });
        }else{
            this.driverService.addDriver(this.driver).subscribe(()=>{
                this.router.navigate(['drivers']);
            });
        }         
    }

    cancel(): void {
        this.router.navigate(['drivers']);
    }
}