import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CattleData } from './model/cattle.data';
import * as _ from 'lodash';
import { NguiMapComponent } from '@ngui/map';
import { AppSettingsService } from './service/app.settings.service';
//import { NguiMapComponent } from '../../node_modules/@ngui/map'; //"../../ ../../../node_modules/@ngui/map";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppSettingsService]
})
export class AppComponent implements OnInit {
  //@ViewChild("iw") iw;
  //@ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent; 
  //@ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  //@ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  title = 'Ng-UI Map by Syed Wakil';
  summary = " This is a NG-UI  Map Application"
  public positions = [];
  imgpath: string = './assets/images/';
map: any;

paths = [[
  {lat: -27.75980769, lng: 152.4},
  {lat: -27.78980769, lng: 152.33},
  {lat: -27.82980769, lng: 152.31},
  {lat: -27.84980769, lng: 152.32},
  {lat: -27.84780769, lng: 152.43}
]
];
pos = {lat: 1, lng: 2};



  constructor(private appSettingsService : AppSettingsService ) {
    //this.positions = this.getMarkers();
   
  }

  ngOnInit() {

    this.appSettingsService.getJSON().subscribe(data => {

      this.positions = this.normalizeData(data);
      //console.log("this data",data);
  });
    
  }

  

   onCustomMarkerInit(customMarker, markerPoint) {
    console.log("customMarker markerPoint", customMarker, markerPoint );
    markerPoint.customMarker = customMarker;
  }


  onMapReady(map) {
    this.map = map;
  }

  normalizeData(mapData: any){

    

    let positions = [];
    let lat: number, lng: number, icon: string, status: number =0;
    let newObj;
    _.forEach(mapData, mapdata => {

      lat = mapdata.lat;
      lng = mapdata.lng;
      status = mapdata.status;
      if(mapdata.status == 0)
        icon =  this.imgpath + 'green.png';
        else
        icon = this.imgpath +  'violet.png';
         newObj = {
          lat: lat,
          lng: lng,
          icon: icon,
          status: status
        }
      positions.push(newObj);

    });
   
    return positions;

  }

  clicked(event, data){
    //console.log('this.nguiMapComponent', this.nguiMapComponent);
    // this.pos = {
    //   lat: this.customMarker.position.lat(), 
    //   lng: this.customMarker.position.lng()
    // };
    //this.nguiMapComponent.openInfoWindow('iw', data);
  }

  

  

}
