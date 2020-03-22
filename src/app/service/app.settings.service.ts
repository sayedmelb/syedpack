import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { MachineData } from '../model/machine.data';

@Injectable({
  
    providedIn: 'root'
  
  })
  
  
  export class AppSettingsService {
    url = './assets/data.json';
     constructor(private http: HttpClient) {
          this.getJSON().subscribe(data => {
              
          });
      }
  
      public getJSON(): Observable<MachineData[]> {
          return this.http.get<MachineData[]>(this.url);
      }
  }