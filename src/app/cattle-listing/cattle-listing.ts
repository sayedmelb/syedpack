import { Component, OnInit, ViewChild, Injectable, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'cattle-listing',
  templateUrl: './cattle-listing.html',
  styleUrls: ['./cattle-listing.scss'],
 
})
export class CattleListing implements OnInit {
 @Input("listing") listing: any;
  


  constructor() {
  
  }

  ngOnInit() {
    
  }

  setHome(navitem: string){
     // alert (navitem);

   
  }
 


}
