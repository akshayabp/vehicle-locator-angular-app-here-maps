import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import {HOSTNAME, PORT} from '../../environments/environment';

import { Driver } from './driver';

@Injectable()
export class DriverService {

    constructor(private http: HttpClient) {
     }

    getDrivers(): Observable<Driver[]> {
        return this.http.get<Driver[]>('http://'+HOSTNAME+':'+PORT+'/drivers');
    }

    getDriver(id: number): Observable<Driver> {
        return this.http.get<Driver>('http://'+HOSTNAME+':'+PORT+'/driver/' + id.toString());
    }

    addDriver(vehicle: Driver): Observable<Driver> {       
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Driver>('http://'+HOSTNAME+':'+PORT+'/driver/', vehicle, options);       
    }

    updateDriver(vehicle: Driver): Observable<Driver> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<Driver>('http://'+HOSTNAME+':'+PORT+'/driver/', vehicle, options);  
    }

    deleteDriver(id: number): Observable<void> {
       return this.http.delete<void>('http://'+HOSTNAME+':'+PORT+'/driver/' + id.toString());
    }
}