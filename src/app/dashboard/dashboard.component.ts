import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { MessageService } from '../messages/message.service';
import {DashboardService} from './dashboard.service';

import { HOSTNAME, WEBSOCKET_PORT, WEBSOCKET_URL } from '../../environments/environment';

import { environment } from '../../environments/environment';


declare var H: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 42.689883;
  lng: number = -73.848734;

  env = environment;


  private serverUrl = WEBSOCKET_URL;

  private stompClient;

  private platform: any;

  private ui: any;

  private map: any;

  private uiMarker: any;

  private markerEventListener: any;

  @ViewChild("map")
  public mapElement: ElementRef;

  
  vehicleLogMap: Map<number, any> = new Map<number, any>();

  constructor(private messageService: MessageService, private dashboardService: DashboardService) {

    this.platform = new H.service.Platform({
      "app_id": "yuvy56OxxbpWvOvl7HGv",
      "app_code": "DSJ_bb-9LHfAw1h1Romvtg"
    });
  }

  ngOnInit() {
    //this.initializeWebSocketConnection();
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: this.lat, lng: this.lng }
      }
    );

    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

    let that = this;

    this.uiMarker = new H.map.Marker({ "lat": 42.689883, "lng": -73.848734 });
    
    let marker = this.uiMarker;

    let markerData = {
      lat: 42.3333,
      long: 34.333,
      route_id:1,
      vehicle_id:11,
      driver_id: 111,
      lastStop: false
    };

    marker.setData(markerData);

    let markerEventListener = event => {

      let markerData = event.target.getData();
      let routeId = markerData.route_id;

      this.dashboardService.getRouteDescription(routeId).subscribe((resp)=>{
        let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
          content:  'Route ID:'+markerData.route_id +'<br/>'+
          'Driver ID:'+markerData.driver_id+'<br/>'+
          'Driver Name:'+resp.driver.name+'<br/>'+
          'Vehicle ID:'+markerData.vehicle_id+'<br/>'+
          'Vehicle Plate:'+resp.vehicle.plate
      });
      that.ui.addBubble(bubble);
      }, (error)=>{
        console.log(error);

        let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
          content:  'Error getting route details.'
      });
      that.ui.addBubble(bubble);

    });

      
      
    };

    this.markerEventListener = markerEventListener;
 
    marker.addEventListener('tap', markerEventListener);

    //this.map.addObject(marker);

    this.initializeWebSocketConnection();

  }

  changeCentre() {
    this.map.setCenter({ lat: this.lat, lng: this.lng });
  }

  handleLogFeed(logfeed: any): void {
    if (logfeed.lastStop) {
      this.messageService.addMessage('Vehicle ' + logfeed.vehicle_id + ' reached destination.');
      let uiMarker = this.vehicleLogMap.get(logfeed.route_id);
      if (uiMarker) {
        this.vehicleLogMap.delete(logfeed.route_id);
        //remove marker from here map
        this.map.removeObject(uiMarker);
      }
    } else {

      let uiMarker = this.vehicleLogMap.get(logfeed.route_id);

      if (uiMarker) {
        //let updatedPositionMarker = new H.geo.Point({ "lat": logfeed.lat , "lng": logfeed.long });
        uiMarker.setPosition({ "lat": logfeed.lat, "lng": logfeed.long });
      } else {

        let existingMarker = {
          lat: logfeed.lat,
          long: logfeed.long,
          route_id: logfeed.route_id,
          vehicle_id: logfeed.vehicle_id,
          driver_id: logfeed.driver_id,
          draggable: false,
          lastStop: logfeed.lastStop
        };

        uiMarker = new H.map.Marker({ "lat": logfeed.lat, "lng": logfeed.long });

        this.vehicleLogMap.set(logfeed.route_id, uiMarker);
        uiMarker.setData(existingMarker);

        uiMarker.addEventListener('tap', this.markerEventListener);

        this.map.addObject(uiMarker);
      }
    }
  }


  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/topic/logfeed", (message) => {
        if (message.body) {

          console.log(message.body);
          let logfeed = JSON.parse(message.body);
          that.handleLogFeed(logfeed);

        }
      });
    });
  }

}



// just an interface for type safety.
interface marker {
  lat: number;
  long: number;
  route_id?: string;
  vehicle_id?: number;
  driver_id?: number;
  label?: string;
  draggable: boolean;
  lastStop?: boolean;
}