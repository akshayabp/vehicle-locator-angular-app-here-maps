import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import {HOSTNAME, PORT} from '../../environments/environment';

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {
    }

    getRouteDescription(id:string):Observable<any> {
        return this.http.get<any>('http://'+HOSTNAME+':'+8088+'/route/'+id);
    }

}