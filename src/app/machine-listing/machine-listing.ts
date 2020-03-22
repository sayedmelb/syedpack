import { Component, OnInit, ViewChild, Injectable, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'machine-listing',
  templateUrl: './machine-listing.html',
  styleUrls: ['./machine-listing.scss'],
 
})
export class MachineListing implements OnInit {
 @Input("listing") listing: any;
  


  constructor() {
  
  }

  ngOnInit() {
    
  }

  setHome(navitem: string){
     // alert (navitem);

   
  }
 


}
