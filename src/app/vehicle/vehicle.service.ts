import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { VEHICLE_LIST_MOCKS } from './vehicle-list-mocks';

import {HOSTNAME, PORT} from '../../environments/environment';

import { Vehicle } from './vehicle';

@Injectable()
export class VehicleService {

    constructor(private http: HttpClient) {
     }

    getVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>('http://'+HOSTNAME+':'+PORT+'/vehicles');
        //return of<Vehicle[]>(VEHICLE_LIST_MOCKS);
    }

    getVehicle(id: number): Observable<Vehicle> {
        //return this.http.get<Product>(API_URL + id.toString());
        return this.http.get<Vehicle>('http://'+HOSTNAME+':'+PORT+'/vehicle/' + id.toString());
        /*var vehicle: Vehicle = VEHICLE_LIST_MOCKS.find(vehicle => vehicle.id ===
            id);
        return of<Vehicle>(vehicle);*/

    }

    addVehicle(vehicle: Vehicle): Observable<Vehicle> {
        //VEHICLE_LIST_MOCKS.push(vehicle);
         //return of<Vehicle>(vehicle);

        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Vehicle>('http://'+HOSTNAME+':'+PORT+'/vehicle/', vehicle, options);       
    }

    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
        //return of<Vehicle>(vehicle);
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<Vehicle>('http://'+HOSTNAME+':'+PORT+'/vehicle/', vehicle, options);  
    }

    deleteVehicle(id: number): Observable<void> {
        var vehicle: Vehicle = VEHICLE_LIST_MOCKS.find(vehicle => vehicle.id ===
            id);
       // return of<Vehicle>(vehicle);
       return this.http.delete<void>('http://'+HOSTNAME+':'+PORT+'/vehicle/' + id.toString());
    }
}