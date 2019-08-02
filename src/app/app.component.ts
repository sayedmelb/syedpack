import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as data from './data/data.json';
import { NguiMapComponent } from '@ngui/map';
//import { NguiMapComponent } from '../../node_modules/@ngui/map'; //"../../ ../../../node_modules/@ngui/map";

const mapData = data.default;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //@ViewChild("iw") iw;
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent; 
  //@ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  //@ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  title = 'Ng-UI Map by Syed Wakil';
  summary = " This is a NG-UI  Map Application"
  public positions = [];
  imgpath: string = 'assets/images/';
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



  constructor() {
    //this.positions = this.getMarkers();
   
  }

  ngOnInit() {


    //console.log("data", mapData);

    //console.log("data", this.positions);
    this.positions = this.normalizeData();
    console.log("data", this.positions);
    
  }

  

  private onCustomMarkerInit(customMarker, markerPoint) {
    console.log("customMarker markerPoint", customMarker, markerPoint );
    markerPoint.customMarker = customMarker;
  }


  onMapReady(map) {
    this.map = map;
  }

  normalizeData(){

    let positions = [];
    let lat: number, lng: number, icon: string, status: number =0;
    for (let i = 0; i < mapData.length; i++) {
      
      lat = mapData[i].lat;
      lng = mapData[i].lng;
      status = mapData[i].status;
      if(mapData[i].status == 0)
        icon =  this.imgpath + 'green.png';
        else
        icon = this.imgpath +  'violet.png';
        let newObj = {
          lat: lat,
          lng: lng,
          icon: icon,
          status: status
        }
      positions.push(newObj);
      
      }
    

    return positions;

  }

  clicked(event, data){
    console.log('this.nguiMapComponent', this.nguiMapComponent);
    // this.pos = {
    //   lat: this.customMarker.position.lat(), 
    //   lng: this.customMarker.position.lng()
    // };
    //this.nguiMapComponent.openInfoWindow('iw', data);
  }

  

  

}
