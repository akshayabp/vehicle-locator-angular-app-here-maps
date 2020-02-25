import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { VEHICLE_LIST_MOCKS } from './vehicle-list-mocks';

//import {MANAGEMENT_SERVICE_HOSTNAME, MANAGEMENT_SERVICE_PORT} from '../../environments/environment';

import { Vehicle } from './vehicle';

@Injectable()
export class VehicleService {

    constructor(private http: HttpClient) {
     }

    getVehicles(): Observable<Vehicle[]> {
        //return this.http.get<Vehicle[]>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/vehicles');
        return this.http.get<Vehicle[]>('/mgmt-api/vehicles');
        //return of<Vehicle[]>(VEHICLE_LIST_MOCKS);
    }

    getVehicle(id: number): Observable<Vehicle> {
        //return this.http.get<Product>(API_URL + id.toString());
        //return this.http.get<Vehicle>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/vehicle/' + id.toString());
        return this.http.get<Vehicle>('/mgmt-api/vehicle/' + id.toString());
        /*var vehicle: Vehicle = VEHICLE_LIST_MOCKS.find(vehicle => vehicle.id ===
            id);
        return of<Vehicle>(vehicle);*/

    }

    addVehicle(vehicle: Vehicle): Observable<Vehicle> {
        //VEHICLE_LIST_MOCKS.push(vehicle);
         //return of<Vehicle>(vehicle);

        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        //return this.http.post<Vehicle>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/vehicle/', vehicle, options);       
        return this.http.post<Vehicle>('/mgmt-api/vehicle/', vehicle, options);       
    
    }

    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
        //return of<Vehicle>(vehicle);
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        //return this.http.put<Vehicle>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/vehicle/', vehicle, options);  
        return this.http.put<Vehicle>('/mgmt-api/vehicle/', vehicle, options);  
    }

    deleteVehicle(id: number): Observable<void> {
        var vehicle: Vehicle = VEHICLE_LIST_MOCKS.find(vehicle => vehicle.id ===
            id);
       // return of<Vehicle>(vehicle);
       //return this.http.delete<void>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/vehicle/' + id.toString());
       return this.http.delete<void>('/mgmt-api/vehicle/' + id.toString());
    }
}