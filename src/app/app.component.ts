import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CattleData } from './model/cattle.data';
import * as _ from 'lodash';
import { NguiMapComponent } from '@ngui/map';
import { AppSettingsService } from './service/app.settings.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppSettingsService]
})
export class AppComponent implements OnInit {
  @ViewChild("iw", { static: false }) iw;
  @ViewChild(NguiMapComponent, { static: false }) nguiMapComponent: NguiMapComponent;
  title: string = 'Ng-UI Map by Syed Wakil';
  summary: string = " This is a NG-UI  Map Application"
  public positions = [];
  imgpath: string = './assets/images/';
  statusMessage: string = "";
  map: any;

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
    });

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
    this.statusMessage = "Cattle id : " + "<b>" + data.id + "</b><br>" + " Status: " + data.desc;
    this.nguiMapComponent.openInfoWindow('iw',
      data.customMarker
    );

  }

  //  onHoverOut() {
  //    this.nguiMapComponent.closeInfoWindow("iw");
  // }





}
