import { Component, OnInit, ViewChild, Injectable, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss'],
 
})
export class NavBar implements OnInit {
    
    @Output() navstatus = new EventEmitter();
 


  constructor() {
  
  }

  ngOnInit() {
  }

  setHome(navitem: string){
     this.navstatus.emit({state: navitem});
  }
 


}
