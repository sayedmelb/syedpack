import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CattleData } from './model/cattle.data';
import * as _ from 'lodash';
import { NguiMapComponent } from '@ngui/map';
import { AppSettingsService } from './service/app.settings.service';
// For MDB Angular Free
import { NavbarModule, WavesModule } from 'angular-bootstrap-md'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppSettingsService]
})
export class AppComponent implements OnInit {
  @ViewChild("iw", { static: false }) iw;
  @ViewChild(NguiMapComponent, { static: false }) nguiMapComponent: NguiMapComponent;
  
  summary: string = "This is a NG-UI  Map Application that shows the current location of cattles of Carla's cattle farm. "

  public positions = [];
  imgpath: string = './assets/images/';
  statusMessage: string = "";
  map: any;
  navtoggle: string ="home";

  errorStatus = false;
  errorMessage = "";

  paths = [[
    { lat: -27.75980769, lng: 152.4 },
    { lat: -27.78980769, lng: 152.33 },
    { lat: -27.82980769, lng: 152.31 },
    { lat: -27.84980769, lng: 152.32 },
    { lat: -27.84780769, lng: 152.43 }
  ]
  ];
  pos = { lat: 1, lng: 2 };



  constructor(private appSettingsService: AppSettingsService) {
  
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.appSettingsService.getJSON().subscribe(data => {
      this.positions = this.normalizeData(data);
    },
      err => {
        console.log("http error", err);
        this.errorStatus = true;
        this.errorMessage = err.message;
      
      }
    
    );

  }



  onCustomMarkerInit(customMarker, markerPoint) {
    markerPoint.customMarker = customMarker;
  }


  onMapReady(map) {
    this.map = map;
  }

  normalizeData(mapData: any) {



    let positions = [];
    let lat: number, lng: number, icon: string, status: number = 0;
    let newObj;
    
    _.forEach(mapData, mapdata => {

      lat = mapdata.lat;
      lng = mapdata.lng;
      status = mapdata.status;
      if (mapdata.status == 0)
        icon = this.imgpath + 'green.png';
      else if (mapdata.status == 1)
        icon = this.imgpath + 'violet.png';
      else if (mapdata.status == 2)
        icon = this.imgpath + 'warning.png';
      else if (mapdata.status == 3)
        icon = this.imgpath + 'danger.png';
      newObj = {
        lat: lat,
        lng: lng,
        icon: icon,
        status: status,
        desc: mapdata.description,
        id: mapdata.id
      }
      positions.push(newObj);

    });

    return positions;

  }

  
  onHover(event, data) {
    this.statusMessage = "Cattle id : " + "<b>" + data.id + "</b><br>" + " Comment: " + data.desc + "<br>"+ "Status: " + "<img height='20px' src='" +data.icon+"' class='custom-icon'/>" ;
    this.nguiMapComponent.openInfoWindow('iw',
      data.customMarker
    );

  }

  //  onHoverOut() {
  //    this.nguiMapComponent.closeInfoWindow("iw");
  // }


  private getAllValues(object: object) {
    let values = []
    for (let key of Object.keys(object)) {
      if (typeof object[key] !== 'object') values.push(object[key]);
      else values = [...values, ...this.getAllValues(object[key])]
    }
    return values;
  }

  private updateFilter(event) {
    if (this.positions.length < 1)  this.getData();
    let temp;
    temp = [...this.positions];
    temp = temp.map(({ customMarker, ...item }) => item);
    const val = event ? event.target.value.toLowerCase() : "";
    let _th = this;
    this.positions = temp.filter(function(d) {
      return (
        JSON.stringify(_th.getAllValues(d))
          .toLowerCase()
          .indexOf(val) !== -1 || !val
      );
    });
  }

  clearFilter(){
    this.getData();
    console.log("this.positions", this.positions);
  }

  OnNavBarClicked(event) {
    //alert(event);
    console.log(event);
    if(event.state=='home'){
      this.navtoggle='home';
    } else if(event.state=='listing') {
      this.navtoggle='listing';

  }

}



}
