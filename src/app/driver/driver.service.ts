import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


//import {MANAGEMENT_SERVICE_HOSTNAME, MANAGEMENT_SERVICE_PORT} from '../../environments/environment';

import { Driver } from './driver';

@Injectable()
export class DriverService {

    constructor(private http: HttpClient) {
     }

    getDrivers(): Observable<Driver[]> {
        //return this.http.get<Driver[]>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/drivers');
        return this.http.get<Driver[]>('/mgmt-api/drivers');
    }

    getDriver(id: number): Observable<Driver> {
        //return this.http.get<Driver>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/driver/' + id.toString());
        return this.http.get<Driver>('/mgmt-api/driver/' + id.toString());
    }

    addDriver(vehicle: Driver): Observable<Driver> {       
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        //return this.http.post<Driver>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/driver/', vehicle, options); 
        return this.http.post<Driver>('/mgmt-api/driver/', vehicle, options);       
    }

    updateDriver(vehicle: Driver): Observable<Driver> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        //return this.http.put<Driver>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/driver/', vehicle, options); 
        return this.http.put<Driver>('/mgmt-api/driver/', vehicle, options); 
    }

    deleteDriver(id: number): Observable<void> {
       //return this.http.delete<void>('http://'+MANAGEMENT_SERVICE_HOSTNAME+':'+MANAGEMENT_SERVICE_PORT+'/driver/' + id.toString());
       return this.http.delete<void>('/mgmt-api/driver/' + id.toString()); 
    }
}